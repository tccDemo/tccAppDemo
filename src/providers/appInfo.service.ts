import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { AppInfo } from './appInfo';
import { APPINFO } from './appInfo-mock';

import { UtilLogService } from './util/util-log.service';
import { IS_USING_REAL_DATA, APP_PACKAGENAME } from './tcc.service';
import { StorageService } from './storage.service';
import { ResourceService } from './resource/resource.service';

@Injectable()
export class AppInfoService {

  constructor(private resourceServ: ResourceService,
    private storageServ: StorageService,
    private utilLogServ: UtilLogService) { }

  private getUrl(): string {
    return `tcc_app/`;
  }

  getAppInfo(): Promise<AppInfo> {

    let url = `${this.getUrl()}AppInfo`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .get(url, {
            packageName: APP_PACKAGENAME
          })
          .then((response) => {
            this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'AppInfoService', 'getAppInfo');
            reslove(response);
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'AppInfoService', 'getAppInfo');
            reject(error);
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'AppInfoService', 'getAppInfo');
          reslove(APPINFO);
        }, 1000);
      }
    });
  }
}