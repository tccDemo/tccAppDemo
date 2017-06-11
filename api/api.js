;(function($, conf, KeyGen) {
  var $_main = $('#documentMain'),
      _token = '',
      _apiList = [];

  var _getApiFacade = function(index) {
    return _apiList[index];
  };

  var _getApiFacadeByName = function(name) {
    for (var i = 0, length = _apiList.length; i < length; i ++) {
      if (_apiList[i].name === name) {
        return _apiList[i];
      }
    }

    return undefined;
  };

  var _callApi = function(apiFacade, apiParams) {
    var deferred = $.Deferred(),
        ts = new Date().getTime();

    if (apiFacade.name == 'login') {
      for (var i = 0; i < apiParams.length; i ++) {
        if (apiParams[i]['name'] == 'password') {
          apiParams[i]['value'] = KeyGen.encode('password', apiParams[i]['value'], ts).encodeStr;
        }
      }
    }

    var requestObj = {
          auth: {
            campusId: conf.campusId,
            method: 'token',
            installId: conf.installId,
            encodeStr: _token,
            timestamp: ts
          },
          requests: [
            {
              clientData: 'request_1',
              serviceName: conf.productName,
              service: apiFacade.name,
              module: apiFacade.module,
              params: apiParams
            }
          ]
        };

    requestObj.auth.encodeStr = KeyGen.encode('token', _token, ts).encodeStr;

    $
      .ajax({
        type: 'POST',
        url: conf.ccapi_server_url + '/appsapi-wdp',
        data: JSON.stringify(requestObj),
        dataType: 'json'
      })
      .done(function(data) {
        var error = false,
            errorMsg = '';

        if (!data.responseList || !data.responseList[0]) {
          error = true;
          errorMsg = 'response format error';
        } else if (data.responseList[0].statusCode !== "0") {
          error = true;
          errorMsg = 'status code error';
        } else {
          try {
            var responseContent = JSON.parse(data.responseList[0].responseContent);
          } catch (e) {
            error = true;
            errorMsg = 'parse error: ' + e.toString();
          }
        }

        if (error === false) {
          deferred.resolve(responseContent);
        } else {
          deferred.reject(errorMsg);
        }
      })
      .fail(function(jqXHR) {
        deferred.reject('http response code:' + jqXHR.status);
      });

    return deferred.promise();
  };

  var _formSerializeArrayToObject = function(formSerializeArray) {
    var returnObject = {};

    for (var i = 0, length = formSerializeArray.length; i < length; i ++) {
      if (formSerializeArray[i].name) {
        returnObject[formSerializeArray[i].name] = formSerializeArray[i].value;
      }
    }

    return returnObject;
  };
  
  $_main
    .on('click', '#searchBtn', function(e) {
      $_main.trigger('apiListRefresh');
    })
    .on('click', '#LoginBtn', function(e) {
      _callApi(_getApiFacadeByName('login'), [
        {name: "campusId", value: conf.campusId},
        {name: "account", value: conf.user_account},
        {name: "password", value: conf.user_password},
        {name: "installId", value: conf.installId}
      ])
        .done(function(data) {
          if(data.result && data.result == 'true') {
            _token = data.token;
          } else {
            alert('Login response error');
          }
        })
        .fail(function(error) {
          alert(error);
        });
    })
    .on('click', '#encodeStr', function(e) {
      var $modal = $(Mustache.render($('#x2b_api_encode').html(), {
            installId: conf.installId,
            campusId: conf.campusId
          })).prependTo('body');
      
      $modal
        .on('submit', 'form[name="encodeStrTokenForm"]', function(e) {
          e.stopPropagation();
          e.preventDefault();

          var formValues = _formSerializeArrayToObject($(e.currentTarget).serializeArray()),
              ts = new Date().getTime();

          $('textarea[name="encodeStrResult"]', $modal).val(JSON.stringify({
            campusId: formValues.campusId,
            method: 'token',
            installId: formValues.installId,
            encodeStr: KeyGen.encode('token', formValues.token, ts).encodeStr,
            timestamp: ts
          }));
        })
        .on('submit', 'form[name="encodeStrPasswordForm"]', function(e) {
          e.stopPropagation();
          e.preventDefault();

          var formValues = _formSerializeArrayToObject($(e.currentTarget).serializeArray()),
              ts = new Date().getTime();

              $('textarea[name="encodeStrPasswordResult"]', $modal).val(KeyGen.encode('password', formValues.password, ts).encodeStr);
        })
        .on('hide.bs.modal', function() {
          $(this).remove();
        })
        .modal();
    })
    .on('click', '[data-cc-func="showImg"]', function() {
      $(Mustache.render($('#x2b_api_image').html(), {
        name: $(this).data('ccParamName'),
        src: $(this).data('ccParamSrc')
      }))
        .prependTo('body')
        .on('hide.bs.modal', function() {
          $(this).remove();
        })
        .modal();
    })
    .on('click', '[data-cc-func="openTest"][data-cc-param-index]', function() {
      var apiFacade = _getApiFacade($(this).data('ccParamIndex')),
          $modal = $(Mustache.render($('#x2b_api_tester').html(), apiFacade)).prependTo('body');

      $modal
        .on('hide.bs.modal', function() {
          $(this).remove();
        })
        .on('click', '[data-cc-func="apiSubmit"]', function() {
          if(apiFacade) {
            var i = apiFacade.params.length,
              paramsArray = [];

            while (i--) {
              paramsArray.push({
                name: apiFacade.params[i].name,
                value: $("#col_" + apiFacade.params[i].name, $modal).val()
              });
            }

            _callApi(apiFacade, paramsArray)
              .done(function(res) {
                $('[data-cc-entry="apiResult"]', $modal).val(JSON.stringify(res));
              })
              .fail(function(error) {
                alert(error)
              });
          } else {
            alert('Unable to find Api Facade: "' + apiFacade.name + '"');
          }
        })
        .modal();
    })
    .on('apiListRefresh', function() {
      var keyword = $('input[name="keyword"]', $_main).val(),
          catalog = $('select[name="catalog"]', $_main).val()
          apiId = $('select[name="searchApiId"]', $_main).val(),
          viewJSON = [];
      catalog = catalog == 'all' ? '' : catalog;

      $('div.api-list', $_main)
        .empty()
        .html(Mustache.render($('#x2b_api_list').html(), {
          'apis': $.grep($.map(_apiList, function(apiElement) {
            //if(keyword != '' && apiElement.name.indexOf(keyword) == '-1') return false;

            if(catalog != '' && apiElement.catalog != catalog) return false;

            if(apiId != '' && apiId != apiElement.name) return false;

            if(apiElement.params.length <= 0) apiElement.params = false;

            apiElement.hasParamsOptions = apiElement.note && apiElement.note.paramsOptions && apiElement.note.paramsOptions.length > 0 ? true : false;
            apiElement.hasReturnOptions = apiElement.note && apiElement.note.returnOptions && apiElement.note.returnOptions.length > 0 ? true : false;
            return apiElement;
          }), function(element) {
            return element === false ? false : true;
          })
        }));

      $('[data-cc-entry="returnJSON"][data-cc-param-index]', $_main).each(function() {
        var apiFacade = _getApiFacade($(this).data('ccParamIndex'));

        $(this).JSONView(apiFacade['return']);
      });
    });

  $.ajax({
    url: 'api.json',
    cache: false,
    dataType: 'json',
    method: 'GET'
  }).then(function(data) {
    $('title, .api-document-title').html('API Document Ver: ' + data.apiVersion);
    _apiList = $.map(data.apiList, function(element, index) {
      element.index = index;
      return element;
    });
    
    var catalogOption = [],
        searchKeyword = $.map(_apiList, function(element) {
          if($.inArray(element.catalog, catalogOption) == -1) catalogOption.push(element.catalog);

          return element.name;
        });

    $_main.html(Mustache.render($('#x2b_api_main').html(), {
      apiList: _apiList,
      catalogOption: catalogOption
    }));
    $_main.trigger('apiListRefresh');
    //$('input[name="keyword"]', $_main).typeahead({source: searchKeyword});
    $('select[name="searchApiId"]', $_main).chained('select[name="catalog"]');
  });
  
})(jQuery, window.apiTesterConfig, window.apiKeyGen);