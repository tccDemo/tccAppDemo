import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { CampusInfo } from './campusInfo';
import { CAMPUSINFO } from './campusInfo-mock';
import { BASE_URL, REQUEST_OPTIONS, IS_USING_REAL_DATA, handleError } from './tcc.service';

@Injectable()
export class CampusInfoService {

  constructor(private http: Http) { }

  getCampusInfo(campusId: number): Promise<CampusInfo> {
    if (IS_USING_REAL_DATA) {
      let cx = "22." + campusId;
      let url = `${BASE_URL}&cmd=getCampusInfo&cx=${cx}`;
      return this.http.get(url).toPromise().then(res => res.json())
        .catch(err => handleError(err));
    } else {
      return Promise.resolve(CAMPUSINFO);
    }
  }
}