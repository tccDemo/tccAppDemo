import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Announcement } from './announcement';
import { ANNOUNCEMENTS } from './mock-announcement';

declare var $:any;

@Injectable()
export class AnnouncementService {

  constructor(private http: Http) {}

  getAnnouncementsByName(term: string): Promise<Announcement[]> {
    return Promise.resolve(ANNOUNCEMENTS).then(announcements => 
      announcements.find(announcement => announcement.title.indexOf(term)!=-1));   
  }

  getAnnouncements(): Promise<Announcement[]> {
    return Promise.resolve(ANNOUNCEMENTS);
  }

  getAnnouncement(id: number): Promise<Announcement> {
    return Promise.resolve(ANNOUNCEMENTS).then(announcements => announcements.find(announcement => announcement.id == +id));   
  }
 
}