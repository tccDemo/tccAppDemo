import { Injectable } from '@angular/core';

import { CalendarSubscribe } from './calendar-subscribe.interface';
import { CampusInfo } from '../campusInfo';

import { AuthStorageService } from '../auth/auth-storage.service';
import { ResourceService } from '../resource/resource.service';
import { UtilLogService } from '../util/util-log.service';
import { IS_USING_REAL_DATA } from '../tcc.service';

import { CALENDAR_SUBSCRIBE_LIST_MOCK } from './calendar-subscribe-list-mock';

@Injectable()
export class CalendarService {

  private getResourceUrl(): string {
    let campusInfo: CampusInfo = this.authStorageServ.getCampusInfo();

    return `tcc_calendar/22.${campusInfo.campusId}/`;
  }

  constructor(
    private authStorageServ: AuthStorageService,
    private resourceServ: ResourceService,
    private utilLogServ: UtilLogService
  ) {}

  public getSubscribeList(): Promise<CalendarSubscribe[]> {
    let url = `${this.getResourceUrl()}CalendarSubscription`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .getWithAuthentication(url)
          .then((response) => {
            this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'CalendarService', 'getSubscribeList');
            reslove(response);
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'CalendarService', 'getSubscribeList');
            reject('Unable to get calendar subscribe list');
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'CalendarService', 'getSubscribeList');
          reslove(CALENDAR_SUBSCRIBE_LIST_MOCK);
        }, 1000);
      }
    });
  }

  public subscribe(calendarSubscribeList: Array<CalendarSubscribe>): Promise<any> {
    let url = `${this.getResourceUrl()}CalendarSubscription`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .putWithAuthentication(url, calendarSubscribeList)
          .then((response) => {
            this.utilLogServ.log(`Put resource "${url}" success`, {calendarSubscribeList: calendarSubscribeList}, 'CalendarService', 'subscribe');
            reslove();
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, {calendarSubscribeList: calendarSubscribeList}, 'CalendarService', 'subscribe');
            reject('Unable to subscribe calendar');
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Put resource "${url}" use fake data`, {calendarSubscribeList: calendarSubscribeList}, 'CalendarService', 'subscribe');
          reslove();
        }, 1000);
      }
    });
  }
}