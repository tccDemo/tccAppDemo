import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { UserInfo } from './userInfo';
import { USERINFO } from './userInfo-mock';

import { BASE_URL, REQUEST_OPTIONS, IS_USING_REAL_DATA, handleError } from './tcc.service';

@Injectable()
export class UserInfoService {

  constructor(private http: Http) { }

  login(userName: string, password: string, campusId: number): Promise<UserInfo> {
    if (IS_USING_REAL_DATA) {
      let cx = "22." + campusId;
      let url = `${BASE_URL}&cmd=login&userName=${userName}&password=${password}&cx=${cx}`;
      return this.http.get(url).toPromise().then(res => res.json())
        .catch(err => handleError(err));
    } else {
      return Promise.resolve(USERINFO);
    }
  }
}