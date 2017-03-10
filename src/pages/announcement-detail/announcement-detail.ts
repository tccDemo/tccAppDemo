import {Component} from '@angular/core';
import {NavParams, ViewController, NavController} from 'ionic-angular';

import {Announcement} from '../../providers/announcement';
import {AnnouncementService} from '../../providers/announcement.service';
import { appToolBar } from '../../utils/appToolbar';

@Component({
  selector: 'page-announcement-detail',
  templateUrl: 'announcement-detail.html'

})
export class AnnouncementDetailPage {

  announcement: Announcement;

  constructor(private navCtrl: NavController,
              private params: NavParams,
              private viewCtrl: ViewController,
              private announcementService: AnnouncementService) {
  }

  ngOnInit(): void {
    this.getAnnouncement(this.params.get('announcementId'));
    appToolBar.hideTabsBar();
  }

  ionViewWillLeave() {
    appToolBar.showTabsBar();
  }

  getAnnouncement(announcementId: number): void {
    this.announcementService.getAnnouncement(announcementId).then((announcement: Announcement) => this.announcement = announcement);
  }
}
