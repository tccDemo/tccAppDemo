import { Component } from '@angular/core';
import { NavParams,ViewController } from 'ionic-angular';

import { Announcement } from '../../providers/announcement';
import { AnnouncementService } from '../../providers/announcement.service';

@Component({
  selector: 'page-announcement-detail',
  templateUrl: 'announcement-detail.html'
})
export class AnnouncementDetailPage {

  announcement:Announcement;

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public announcementService: AnnouncementService
  	){}

  ngOnInit(): void {
    this.getAnnouncement(this.params.get('announcementId'));
  }

  getAnnouncement(announcementId: number): void {
    this.announcementService.getAnnouncement(announcementId).then( (announcement: Announcement) => this.announcement = announcement );
  }

  dismiss():void {
    this.viewCtrl.dismiss();
  }

}
