import { Injectable } from '@angular/core';

import { SettingNotification } from './setting-notification.interface';
import { CampusInfo } from '../campusInfo';

import { AuthStorageService } from '../auth/auth-storage.service';
import { ResourceService } from '../resource/resource.service';
import { UtilLogService } from '../util/util-log.service';
import { IS_USING_REAL_DATA } from '../tcc.service';

import { SETTING_NOTIFICATION_MOCK } from './setting-notification-mock';

@Injectable()
export class SettingService {

  private getResourceUrl(): string {
    let campusInfo: CampusInfo = this.authStorageServ.getCampusInfo();

    return `tcc_notification/22.${campusInfo.campusId}/`;
  }

  constructor(
    private resourceServ: ResourceService,
    private utilLogServ: UtilLogService,
    private authStorageServ: AuthStorageService
  ) {}

  public getNotification(): Promise<SettingNotification> {
    let url = `${this.getResourceUrl()}NotificationSetting`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .getWithAuthentication(url)
          .then((response) => {
            this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'SettingService', 'getNotification');
            reslove(response);
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'SettingService', 'getNotification');
            reject('Unable to get notification setting');
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'SettingService', 'getNotification');
          reslove(SETTING_NOTIFICATION_MOCK);
        }, 1000);
      }
    });
  }

  public setNotification(settingNotification: SettingNotification): Promise<any> {
    let url = `${this.getResourceUrl()}NotificationSetting`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .putWithAuthentication(url, {
            pushAnnouncements: settingNotification.pushAnnouncements,
            pushBookmarks: settingNotification.pushBookmarks,
            pushCalEvents: settingNotification.pushCalEvents,
            enableQuietHours: settingNotification.enableQuietHours
          })
          .then((response) => {
            this.utilLogServ.log(`Put resource "${url}" success`, {settingNotification: settingNotification}, 'SettingService', 'setNotification');
            reslove();
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, {settingNotification: settingNotification}, 'SettingService', 'setNotification');
            reject('Unable to set notification');
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Put resource "${url}" use fake data`, {settingNotification: settingNotification}, 'SettingService', 'setNotification');
          reslove();
        }, 1000);
      }
    });
  }
}