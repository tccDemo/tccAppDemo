import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AppInfo } from './appInfo';

import { BASE_URL, REQUEST_OPTIONS, handleError } from './tcc.service';

declare var $:any;

@Injectable()
export class AppInfoService {

  constructor(private http: Http) {}

  getAppInfo(): Promise<AppInfo[]> {
    let cx = "22.1";
    let url = `${BASE_URL}&cmd=getAppInfo&cx=${cx}`;
    return this.http.post(url, REQUEST_OPTIONS).toPromise().then(res => res.json())
      .catch(err => handleError(err));
  }
}