import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';

import { Announcement } from './announcement';
import { ANNOUNCEMENTS } from './announcement-mock';

declare var $:any;

@Injectable()
export class AnnouncementService {

  constructor(private http: Http) {}

  private url = "http://ccstage.campuscruiser.com/DataServlet?pg=gb-ajax-data-test";
  private headers = new Headers({'Content-Type': 'application/json'});

  getAnnouncementsByName(term: string): Promise<Announcement[]> {
    return this.getAnnouncements().then(announcements => 
      announcements.find(announcement => announcement.title.indexOf(term)!=-1));   
  }

  getAnnouncements(): Promise<Announcement[]> {
    // return Promise.resolve(ANNOUNCEMENTS);

    let url = "http://ccstage.campuscruiser.com/DataServlet?pg=gb-ajax-data-test&login=xuzp&cx=22.1&cmd=getCampusAnnouncements";
    let options = new RequestOptions({headers: this.headers});
    return this.http.get(url, options).toPromise().then(res => res.json())
    	.catch(err => this.handleError(err));


     
    // let prams = JSON.stringify({"login": "xuzp", "cx": "22.1", "cmd": "getCampusAnnouncements"});
    // return  this.http
    //        // .get(this.url)
    //        .post(this.url, prams, {headers: this.headers})
    //        .map(res => res.json())
    //        .subscribe(data => resolve(date), err => this.handleError(err))
    //        .catch(this.handleError);

             //   .toPromise().then(response => response.json().data as Announcement[])
             // .catch(this.handleError);
  }

  getAnnouncement(id: number): Promise<Announcement> {
    return this.getAnnouncements().then(announcements => announcements.find(announcement => announcement.id == +id));   
  }

  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); // for demo purposes only
    return Promise.reject(error.message || error);
  }
}