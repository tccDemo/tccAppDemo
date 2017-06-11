import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { UserInfo } from './userInfo';
import { USERINFO } from './userInfo-mock';

import { UtilLogService } from './util/util-log.service';
import { IS_USING_REAL_DATA } from './tcc.service';
import { StorageService, CAMPUS_INFO } from './storage.service';
import { ResourceService } from './resource/resource.service';

@Injectable()
export class UserInfoService {

  constructor(private resourceServ: ResourceService,
    private storageServ: StorageService,
    private utilLogServ: UtilLogService) { }

  private getUrl(): string {
    return `tcc_user/`;
  }

  getUserInfo(userName: string, password: string, campusId: number): Promise<UserInfo> {

    let url = `${this.getUrl()}UserInfo`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .getWithAuthentication(url)
          .then((response) => {
            this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'UserInfoService', 'getUserInfo');
            reslove(response);
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'UserInfoService', 'getUserInfo');
            reject(error);
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'UserInfoService', 'getUserInfo');
          reslove(USERINFO);
        }, 1000);
      }
    });

  }
}