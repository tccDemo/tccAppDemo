import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Event } from './event';
import { EVENTS } from './mock-event';

declare var $:any;

@Injectable()
export class EventService {

  constructor(private http: Http) {}

  getEventsByName(term: string): Promise<Event[]> {
    return Promise.resolve(EVENTS).then(events => 
      events.find(ev => ev.title.indexOf(term)!=-1));   
  }

  getEvents(): Promise<Event[]> {
    return Promise.resolve(EVENTS);
  }

  getEvent(id: number): Promise<Event> {
    return Promise.resolve(EVENTS).then(events => events.find(ev => ev.id == +id));   
  }
 
}