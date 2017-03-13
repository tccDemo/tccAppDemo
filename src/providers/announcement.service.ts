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
    return this.getAnnouncements().then((announcements:any) =>
      announcements.find(announcement => announcement.title.indexOf(term)!=-1));
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

  getAnnouncement(id: number): Promise<Announcement> {
    return this.getAnnouncements().then(announcements => announcements.find(announcement => announcement.id == +id));
  }
}