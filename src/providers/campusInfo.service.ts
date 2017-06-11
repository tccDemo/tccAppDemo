import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { CampusInfo } from './campusInfo';
import { CAMPUSINFO } from './campusInfo-mock';

import { CampusDesign } from './campusDesign';
import { CAMPUSDESIGN_DEFAULT } from './campusDesign-default';

import { UtilLogService } from './util/util-log.service';
import { IS_USING_REAL_DATA } from './tcc.service';
import { StorageService, CAMPUS_INFO } from './storage.service';
import { ResourceService } from './resource/resource.service';

@Injectable()
export class CampusInfoService {

  constructor(private resourceServ: ResourceService,
    private storageServ: StorageService,
    private utilLogServ: UtilLogService) { }

  private getUrl(): string {
    return `tcc_campus/`;
  }

  getCampusAppInfo(campusCode: string): Promise<CampusInfo> {
    let url = `${this.getUrl()}CampusInfo`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .get(url, {
            campusCode: campusCode
          })
          .then((response) => {
            this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'CampusInfoService', 'getCampusInfo');
            reslove(response);
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'CampusInfoService', 'getCampusInfo');
            reject(error);
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'CampusInfoService', 'getCampusInfo');
          reslove(CAMPUSINFO);
        }, 1000);
      }
    });
  }

  getCampusDesign(campusInfo: CampusInfo): Promise<CampusDesign> {
    return new Promise((reslove, reject) => {
      var ret = CAMPUSDESIGN_DEFAULT;

      if (campusInfo.theme) {
        ret.theme.color = campusInfo.theme;
        ret.button.color = campusInfo.theme;
        ret.header.color = campusInfo.theme;
        ret.tabs.color = campusInfo.theme;
        ret.segments.color = campusInfo.theme;
      }

      if (campusInfo.logo) {
        ret.loginPage.logo = `${campusInfo.host}/${campusInfo.logo}`;
      }

      if (campusInfo.campusName) {
        ret.loginPage.campusName = campusInfo.campusName;
      }

      if (campusInfo.loginBGColor) {
        ret.loginPage.backgroundColor = campusInfo.loginBGColor;
      }

      if (campusInfo.loginBGImage) {
        ret.loginPage.backgroundImg = `${campusInfo.host}/${campusInfo.loginBGImage}`;
      }

      reslove(ret);
    });
  }
}