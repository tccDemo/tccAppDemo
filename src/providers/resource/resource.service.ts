import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Transfer, FileUploadOptions, FileTransferError, TransferObject } from '@ionic-native/transfer';

import 'rxjs/add/operator/toPromise';

import { ResourceParam } from './resource-param.interface';
import { CampusInfo } from '../campusInfo';

import { UtilLogService } from '../util/util-log.service';
import { AuthStorageService } from '../auth/auth-storage.service';
import { ResourceKeygenService } from './resource-keygen.service';
import { BASE_URL } from '../tcc.service';


@Injectable()
export class ResourceService {

  private getAuthenticationToken(): string {
    let ts: string = new Date().getTime().toString(),
        campusInfo: CampusInfo = this.authStorageServ.getCampusInfo(),
        installId: string = this.authStorageServ.getDeviceUUID(),
        token: string = this.authStorageServ.getAccessToken();
    
    return JSON.stringify({
      'campusId': campusInfo.campusId,
      'method': 'token',
      'installId': installId,
      'encodeStr': this.resourceKeygenServ.encode(installId, 'token', token, ts),
      'timestamp': ts
    });
  }

  private getAuthenticationOptions(): RequestOptions {
    return new RequestOptions({
      headers: new Headers({
        'X-API-Token': this.getAuthenticationToken()
      })
    });
  }

  constructor(
    private http: Http,
    private transfer: Transfer,
    private utilLogServ: UtilLogService,
    private resourceKeygenServ: ResourceKeygenService,
    private authStorageServ: AuthStorageService
  ) {}

  private errorHandler(error: any, reject: (reason?: any) => void, funcName: string, url: string, param: ResourceParam | Array<any> = {}): void {
    let rejectMessage = 'Unable to process resource';

    if (error instanceof Response) {
      if (error.status == 400) {
        rejectMessage = error.text();
      } else if (error.status != 0) {
        rejectMessage = error.statusText;
      }

      if (error.status == 401 || error.status == 403) {
        // this.authStorageServ.removeAccessToken();
      }

      this.utilLogServ.warn(`<${error.status}: ${error.statusText}> ${error.text()}`, {
        url: url,
        param: param
      }, 'ResourceService', funcName);
    }

    reject(rejectMessage);
  }

  public resourceParamToQueryString(param: ResourceParam): string {
    let queryStringArray = [];

    for (let k in param) {
      queryStringArray.push(`${k}=${encodeURIComponent(param[k].toString())}`);
    }

    return queryStringArray.join('&');
  }

  public get(url: string, param: ResourceParam = {}): Promise<any> {
    return new Promise((reslove, reject) => {
      let queryString = this.resourceParamToQueryString(param);

      if (queryString != '') {
        queryString = `?${queryString}`;
      }

      this.http
        .get(`${BASE_URL}${url}${queryString}`)
        .toPromise()
        .then((response: Response) => {
          let body = response.json();

          this.utilLogServ.log('Get resource with authentication success', {
            url: url,
            param: param
          }, 'ResourceService', 'get');

          reslove(body);
        })
        .catch(error => {
          this.errorHandler(error, reject, 'get', url, param);
        });
    });
  }

  public getWithAuthentication(url: string, param: ResourceParam = {}): Promise<any> {
    return new Promise((reslove, reject) => {
      let queryString = this.resourceParamToQueryString(param);

      if (queryString != '') {
        queryString = `?${queryString}`;
      }

      this.http
        .get(`${BASE_URL}${url}${queryString}`, this.getAuthenticationOptions())
        .toPromise()
        .then((response: Response) => {
          let body = response.json();

          this.utilLogServ.log('Get resource with authentication success', {
            url: url,
            param: param
          }, 'ResourceService', 'getWithAuthentication');

          reslove(body);
        })
        .catch(error => {
          this.errorHandler(error, reject, 'getWithAuthentication', url, param);
        });
    });
  }

  public putWithAuthentication(url: string, param: ResourceParam | Array<any>): Promise<any> {
    return new Promise((reslove, reject) => {
      this.http
        .put(`${BASE_URL}${url}`, param, this.getAuthenticationOptions())
        .toPromise()
        .then((response: Response) => {
          let body = response.text();

          this.utilLogServ.log('Put resource with authentication success', {
            url: url,
            param: param
          }, 'ResourceService', 'putWithAuthentication');

          reslove(body);
        })
        .catch(error => {
          this.errorHandler(error, reject, 'putWithAuthentication', url, param);
        });
    });
  }

  public postWithAuthentication(url: string, param: ResourceParam): Promise<any> {
    return new Promise((reslove, reject) => {
      this.http
        .post(`${BASE_URL}${url}`, param, this.getAuthenticationOptions())
        .toPromise()
        .then((response: Response) => {
          let body = response.text();

          this.utilLogServ.log('Post resource with authentication success', {
            url: url,
            param: param
          }, 'ResourceService', 'postWithAuthentication');

          reslove(body);
        })
        .catch(error => {
          this.errorHandler(error, reject, 'postWithAuthentication', url, param);
        });
    });
  }

  public deleteWithAuthentication(url: string, param: ResourceParam = {}): Promise<any> {
    return new Promise((reslove, reject) => {
      let queryString = this.resourceParamToQueryString(param);

      if (queryString != '') {
        queryString = `?${queryString}`;
      }

      this.http
        .delete(`${BASE_URL}${url}${queryString}`, this.getAuthenticationOptions())
        .toPromise()
        .then((response: Response) => {
          let body = response.text();
          
          this.utilLogServ.log('Delete resource with authentication success', {
            url: url,
            param: param
          }, 'ResourceService', 'deleteWithAuthentication');

          reslove(body);
        })
        .catch(error => {
          this.errorHandler(error, reject, 'deleteWithAuthentication', url, param);
        });
    });
  }

  public uploadFileWithAuthentication(source: string, url: string, fileKey: string = 'upfile', fileName: string = 'upfile') {
    return new Promise((reslove, reject) => {
      const fileTransfer: TransferObject = this.transfer.create();

      let token = this.getAuthenticationToken(),
          options: FileUploadOptions = {
            fileKey: fileKey,
            fileName: fileName,
            headers: {
              'X-API-Token': token
            }
          };
      
      fileTransfer
        .upload(source, `${BASE_URL}${url}`, options)
        .then((response) => {
          this.utilLogServ.log(`Upload file to "${url}" success`, {
            source: source,
            url: url,
            token: token
          }, 'ResourceService', 'uploadWithAuthentication');

          reslove();
        })
        .catch((error: FileTransferError) => {
          this.utilLogServ.warn(`Unable to upload resource, url: "${url}"`, {
            source: source,
            url: url,
            error: error
          }, 'ResourceService', 'uploadWithAuthentication');

          reject('Unable to upload file');
        });
    });
  }

  public downloadFileWithAuthentication(url: string, filePath: string) {
    return new Promise((reslove, reject) => {
      const fileTransfer: TransferObject = this.transfer.create();
      let token = this.getAuthenticationToken();

      fileTransfer
        .download(`${BASE_URL}${url}`, filePath, undefined, {
          headers: {
            'X-API-Token': token
          }
        })
        .then((response) => {
          this.utilLogServ.log(`Download file to "${filePath}" success`, {
            url: url,
            filePath: filePath,
            token: token
          }, 'ResourceService', 'downloadWithAuthentication');
          
          reslove();
        })
        .catch((error: FileTransferError) => {
          this.utilLogServ.warn(`Unable to download resource, url: "${url}"`, {
            url: url,
            filePath: filePath,
            error: error
          }, 'ResourceService', 'downloadWithAuthentication');

          reject('Unable to download file');
        });
    });
  }
}