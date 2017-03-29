import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Event } from './event';
import { EVENTS } from './event-mock';

import { BASE_URL, REQUEST_OPTIONS, IS_USING_REAL_DATA, handleError, TCCData } from './tcc.service';

declare var $: any;

@Injectable()
export class EventService {

  private cx: string;
  private token: string;

  constructor(
    private http: Http,
    private tccData: TCCData,
  ) {
    this.cx = "22." + this.tccData.getCampusId();
    this.token = this.tccData.getToken();
  }

  getEventsByName(term: string): Promise<Event[]> {
    return Promise.resolve(EVENTS).then((events: any) =>
      events.find(ev => ev.title.indexOf(term) != -1));
  }

  getEvents(): Promise<Event[]> {

    if (IS_USING_REAL_DATA) {
      let url = `${BASE_URL}&cmd=getCalEvents&cx=${this.cx}&token=${this.token}`;
      return this.http.get(url).toPromise().then(res => this.parseJSON(res))
        .catch(err => handleError(err));
    } else {
      return Promise.resolve(EVENTS);
    }
  }

  parseJSON(res): Event[] {
    let objs = res.json();
    for (let i = 0; i < objs.length; i++) {
      objs[i].startDate = new Date(objs[i].startDate);
      objs[i].endDate = new Date(objs[i].endDate);
    }
    return objs;
  }

  parseSingleJSON(res): Event {
    let obj = res.json();
    obj.startDate = new Date(obj.startDate);
    obj.endDate = new Date(obj.endDate);
    return obj;
  }

  getEvent(id: number): Promise<Event> {

    if (IS_USING_REAL_DATA) {
      let url = `${BASE_URL}&cmd=getCalEvent&cx=${this.cx}&token=${this.token}&id=${id}`;
      return this.http.get(url).toPromise().then(res => this.parseSingleJSON(res))
        .catch(err => handleError(err));
    } else {
      return Promise.resolve(EVENTS).then(events => events.find(ev => ev.id == +id));
    }
  }

}