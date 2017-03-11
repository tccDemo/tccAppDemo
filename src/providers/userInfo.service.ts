import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { UserInfo } from './userInfo';

import { BASE_URL, REQUEST_OPTIONS, handleError } from './tcc.service';

declare var $:any;

@Injectable()
export class UserInfoService {

  constructor(private http: Http) {}

  login(userName:string, password: string, campusId: number): Promise<UserInfo> {
    let cx = "22." + campusId;
    let url = `${BASE_URL}&cmd=login&userName=${userName}&password=${password}&cx=${cx}`;
    return this.http.post(url, REQUEST_OPTIONS).toPromise().then(res => res.json())
      .catch(err => handleError(err));      
  }
}