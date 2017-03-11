import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { CampusInfo } from './campusInfo';

import { BASE_URL, REQUEST_OPTIONS, handleError } from './tcc.service';

declare var $:any;

@Injectable()
export class CampusInfoService {

  constructor(private http: Http) {}

  getCampusInfo(campusId:number): Promise<CampusInfo> {
    let cx = "22." + campusId;
    let url = `${BASE_URL}&cmd=getCampusInfo&cx=${cx}`;
    return this.http.post(url, REQUEST_OPTIONS).toPromise().then(res => res.json())
      .catch(err => handleError(err));
  }
}