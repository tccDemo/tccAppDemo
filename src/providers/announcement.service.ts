import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Announcement } from './announcement';
import { ANNOUNCEMENTS } from './announcement-mock';

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
  getAnnouncementNumber(): number {
    var ret = 0;
    for (var i = 0; i < ANNOUNCEMENTS.length; i++) {
      if (ANNOUNCEMENTS[i].isNew) {
        ret++;
      }
    }
    return ret;
  }
}