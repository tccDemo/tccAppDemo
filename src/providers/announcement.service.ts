import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Announcement } from './announcement';
import { ANNOUNCEMENTS } from './announcement-mock';
import { BASE_URL, REQUEST_OPTIONS, IS_USING_REAL_DATA, handleError, TCCData } from './tcc.service';

@Injectable()
export class AnnouncementService {

  private cx: string;
  private token: string;

  constructor(
    private http: Http,
    private tccData: TCCData,
  ) {
    this.cx = "22." + this.tccData.getCampusId();
    this.token = this.tccData.getToken();
  }

  getAnnouncementsByName(term: string): Promise<Announcement[]> {
    return this.getAnnouncements().then((announcements: any) =>
      announcements.find(announcement => announcement.title.indexOf(term) != -1));
  }

  getAnnouncements(): Promise<Announcement[]> {

    if (IS_USING_REAL_DATA) {
      let url = `${BASE_URL}&cmd=getCampusAnnouncements&cx=${this.cx}&token=${this.token}`;
      return this.http.get(url).toPromise().then(res => res.json())
        .catch(err => handleError(err));
    } else {
      return Promise.resolve(ANNOUNCEMENTS);
    }
  }

  getNewAnnouncements(): Promise<Announcement[]> {
    if (IS_USING_REAL_DATA) {
      let url = `${BASE_URL}&cmd=getNewAnnouncements&cx=${this.cx}&token=${this.token}`;
      return this.http.get(url).toPromise().then(res => res.json())
        .catch(err => handleError(err));
    } else {
      var ret = new Array();
      for (var i = 0; i < ANNOUNCEMENTS.length; i++) {
        if (ANNOUNCEMENTS[i].isNew && !ANNOUNCEMENTS[i].hasNotified) {
          ANNOUNCEMENTS[i].hasNotified = true;
          ret.push(ANNOUNCEMENTS[i]);
        }
      }
      return Promise.resolve(ret);
    }
  }

  markAllRead(): Promise<boolean> {
    if (IS_USING_REAL_DATA) {
      let url = `${BASE_URL}&cmd=markAllAnnouncementRead&cx=${this.cx}&token=${this.token}`;
      this.http.get(url);
    } else {
      for (var i = 0; i < ANNOUNCEMENTS.length; i++) {
        if (ANNOUNCEMENTS[i].isNew) {
          ANNOUNCEMENTS[i].isNew = false;
        }
      }     
    }    
    return Promise.resolve(true);
  }

  getAnnouncement(id: number): Promise<Announcement> {
    if (IS_USING_REAL_DATA) {
      let url = `${BASE_URL}&cmd=getAnnouncement&cx=${this.cx}&token=${this.token}&id=${id}`;
      return this.http.get(url).toPromise().then(res => res.json())
        .catch(err => handleError(err));
    } else {
      return this.getAnnouncements().then(announcements => announcements.find(announcement => announcement.id == +id));
    }
  }
}