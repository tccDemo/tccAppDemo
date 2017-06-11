import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Notification } from './notification';
import { NOTIFICATIONS } from './notification-mock';

import { CampusInfo } from './campusInfo';
import { ResourceService } from './resource/resource.service';
import { UtilLogService } from './util/util-log.service';
import { IS_USING_REAL_DATA, LOAD_COUNT } from './tcc.service';
import { StorageService, CAMPUS_INFO } from './storage.service';

@Injectable()
export class NotificationService {

  private getResourceUrl(): string {
    let campusInfo: CampusInfo = this.storageServ.get(CAMPUS_INFO);
    return `tcc_notification/22.${campusInfo.campusId}/`;
  }

  constructor(
    private resourceServ: ResourceService,
    private storageServ: StorageService,
    private utilLogServ: UtilLogService
  ) { }

  getNotificationsByName(term: string): Promise<Notification[]> {
    return this.getNotifications(1, 100).then((notifications: any) =>
      notifications.find(notification => notification.title.indexOf(term) != -1));
  }

  getNotifications(start: number, count: number = LOAD_COUNT): Promise<Notification[]> {
    let url = `${this.getResourceUrl()}Notification/list`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .getWithAuthentication(url, {
            start: start,
            count: count
          })
          .then((response) => {
            this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'NotificationService', 'getNotifications');
            reslove(this.parseJSON(response));
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'NotificationService', 'getNotifications');
            reject(error);
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'NotificationService', 'getNotifications');

          var ret: Notification[] = [];
          if (start > 0 && start <= NOTIFICATIONS.length) {
            var end = start + count;
            if (end >= NOTIFICATIONS.length) {
              end = NOTIFICATIONS.length;
            }
            for (var i = start - 1, j = 0; i < end; i++ , j++) {
              ret[j] = NOTIFICATIONS[i];
            }
          }
          reslove(ret);
        }, 1000);
      }
    });
  }

  getNotificationNumber(): Promise<Number> {
    return this.getNotifications(1, 100).then((notifications: any) => {
      var ret = 0;
      for (var i = 0; i < notifications.length; i++) {
        if (!notifications[i].hasRead) {
          ret++;
        }
      }
      return ret;
    });
  }

  markRead(notification: Notification): Promise<any> {

    let url = `${this.getResourceUrl()}Notification/`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .putWithAuthentication(url, {
            objectId: notification.objectId,
            type: notification.type
          })
          .then((response) => {
            this.utilLogServ.log(`Put resource "${url}" success`, undefined, 'NotificationService', 'markRead');
            reslove(response);
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to put resource, url: "${url}"`, undefined, 'NotificationService', 'markRead');
            reject(error);
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Put resource "${url}" use fake data`, undefined, 'NotificationService', 'markRead');
          for (var i = 0; i < NOTIFICATIONS.length; i++) {
            if (NOTIFICATIONS[i].objectId === notification.objectId && NOTIFICATIONS[i].type === notification.type) {
              NOTIFICATIONS[i].hasRead = true;
            }
          }
          reslove(NOTIFICATIONS);
        }, 1000);
      }
    });

  }

  delete(objectId:string, type:string): Promise<any> {

    let url = `${this.getResourceUrl()}Notification/`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .deleteWithAuthentication(url, {
            objectId: objectId,
            type: type
          })
          .then((response) => {
            this.utilLogServ.log(`Delete resource "${url}" success`, undefined, 'NotificationService', 'delete');
            reslove(response);
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to delete resource, url: "${url}"`, undefined, 'NotificationService', 'delete');
            reject(error);
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Delete resource "${url}" use fake data`, undefined, 'NotificationService', 'delete');
          for (var i = 0; i < NOTIFICATIONS.length; i++) {
            if (NOTIFICATIONS[i].objectId === objectId && NOTIFICATIONS[i].type === type) {
              NOTIFICATIONS.splice(i, 1);
              break;
            }
          }
          reslove(NOTIFICATIONS);
        }, 1000);
      }
    });
  }

  clearAll(): Promise<any> {

    let url = `${this.getResourceUrl()}Notification/list/`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .deleteWithAuthentication(url, {})
          .then((response) => {
            this.utilLogServ.log(`Delete resource "${url}" success`, undefined, 'NotificationService', 'clearAll');
            reslove(response);
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'NotificationService', 'clearAll');
            reject(error);
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Delete resource "${url}" use fake data`, undefined, 'NotificationService', 'clearAll');
          NOTIFICATIONS.splice(0, NOTIFICATIONS.length);
          reslove(NOTIFICATIONS);
        }, 1000);
      }
    });
  }

  parseJSON(res): Event[] {
    let objs = res;
    for (let i = 0; i < objs.length; i++) {
      objs[i].publishedDate = new Date(objs[i].publishedAt);
    }
    return objs;
  }

  parseSingleJSON(res): Event {
    let obj = res;
    obj.publishedDate = new Date(obj.publishedAt);
    return obj;
  }
}