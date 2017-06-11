;(function(global, conf) {
  var _iv = [0xb0, 0x7b, 0xf5, 0x22, 0xc8, 0xd6, 0x08, 0xb8, 0x81, 0xe2, 0x84, 0x8e, 0x91, 0x74, 0x74, 0xce],
      _salt = [0xca, 0xfe, 0xba, 0xbe, 0xba, 0xad, 0x12, 0x34];

  var _stringToByteArray = function(input) {
    var returnByteArray = [];

    if(_.isString(input)) {
      var strLength = input.length;

      for(var i = 0; i < strLength; i ++) returnByteArray.push(input.charCodeAt(i));
    }

    return returnByteArray;
  };

  var _stringToHexArray = function(input) {
    var returnHexArray = [];

    if(_.isString(input)) {
      var strLength = input.length;

      for(var i = 0; i < strLength; i += 2) returnHexArray.push(parseInt("0x" + input.substr(i, 2), 16));
    }

    return returnHexArray;
  };

  var _arrayToHexString = function(input) {
    var returnHexString = [];

    if(_.isArray(input)) {
      var arrLength = input.length;

      for(var i = 0; i < arrLength; i ++) {
        var tmp = input[i].toString(16);

        if(tmp.length == 1) tmp = '0' + tmp;

        returnHexString.push(tmp); 
      }
    }

    return returnHexString.join('');
  };

  var _hexArrayMd5 = function(inputHexArray) {
    return faultylabs.MD5(inputHexArray);
  };

  var _hexStringSha1 = function(inputHexString) {
    var hashObj = new jsSHA(
      'SHA-1',
      'HEX',
      {numRounds: 1}
    );
    hashObj.update(inputHexString);
    return hashObj.getHash('HEX');
  };

  var _encrypt = function(keyMaterial, toBeEncrypted) {
    var key = _deriveKey(keyMaterial),
        iv = _arrayToHexString(_iv);
    key = _arrayToHexString(key);

    var encrypted = CryptoJS.AES.encrypt(toBeEncrypted, CryptoJS.enc.Hex.parse(key), {
      iv: CryptoJS.enc.Hex.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  };

  var _deriveKey = function(keyMaterial) {
    var deviceKey = [];

    var temp = _hexArrayMd5(_stringToByteArray(keyMaterial).concat(_salt));
    temp = _hexArrayMd5(_stringToHexArray(temp));
    temp = _stringToHexArray(temp);

    deviceKey = deviceKey.concat(temp.slice(0, 8));

    temp = _hexStringSha1(_arrayToHexString(temp));
    temp = _hexStringSha1(temp);
    temp = _stringToHexArray(temp);

    deviceKey = deviceKey.concat(temp.slice(8, 16));

    return deviceKey;
  };

  var _generateKey = function(sharedKey, installId, timestamp) {
    return _hexArrayMd5(_stringToByteArray(timestamp + installId + sharedKey)).toLowerCase();
  };

  var encode = function(type, original, ts) {
    var returnJSON = {
      installId: conf.installId,
      encodeStr: ''
    };

    if(type == 'password') {
      returnJSON.encodeStr = _encrypt(returnJSON.installId, original);
    } else if(type == 'token') {
      if(original.indexOf && original.indexOf("%") > -1) original = decodeURIComponent(original);

      returnJSON.encodeStr = encodeURIComponent(_generateKey(original, returnJSON.installId, ts) + ':' + original);
    }

    return returnJSON;
  };

  global.apiKeyGen = {
    encode: encode
  };
})(window, window.apiTesterConfig);