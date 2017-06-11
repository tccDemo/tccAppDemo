import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Event } from './event';
import { EVENTS } from './event-mock';

import { CampusInfo } from './campusInfo';
import { ResourceService } from './resource/resource.service';
import { UtilLogService } from './util/util-log.service';
import { IS_USING_REAL_DATA, LOAD_COUNT } from './tcc.service';
import { StorageService, CAMPUS_INFO } from './storage.service';

@Injectable()
export class EventService {

  private getResourceUrl(): string {
    let campusInfo: CampusInfo = this.storageServ.get(CAMPUS_INFO);
    return `tcc_calendar/22.${campusInfo.campusId}/`;
  }

  constructor(
    private resourceServ: ResourceService,
    private storageServ: StorageService,
    private utilLogServ: UtilLogService
  ) { }

  getEventsByName(term: string): Promise<Event[]> {
    return Promise.resolve(EVENTS).then((events: any) =>
      events.find(ev => ev.title.indexOf(term) != -1));
  }

  getEvents(): Promise<Event[]> {

    let url = `${this.getResourceUrl()}Event/list`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .getWithAuthentication(url)
          .then((response) => {
            this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'EventService', 'getEvents');
            reslove(this.parseJSON(response));
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'EventService', 'getEvents');
            reject(error);
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'EventService', 'getEvents');
          reslove(EVENTS);
        }, 1000);
      }
    });
  }

  parseJSON(res): Event[] {
    // let objs = res.json();
    let objs = res;
    for (let i = 0; i < objs.length; i++) {
      objs[i].start = new Date(objs[i].startDate);
      objs[i].end = new Date(objs[i].endDate);
    }
    return objs;
  }

  parseSingleJSON(res): Event {
    // let obj = res.json();
    let obj = res;
    obj.start = new Date(obj.startDate);
    obj.end = new Date(obj.endDate);
    return obj;
  }

  getEvent(id: string): Promise<Event> {

    let url = `${this.getResourceUrl()}Event/${id}`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .getWithAuthentication(url)
          .then((response) => {
            this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'EventService', 'getEvent');
            reslove(this.parseSingleJSON(response));
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'EventService', 'getEvent');
            reject(error);
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'EventService', 'getEvent');
          reslove(EVENTS.find(ev => ev.id == id));
        }, 1000);
      }
    });
  }
}