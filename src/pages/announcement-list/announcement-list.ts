import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Announcement } from '../../providers/announcement';
import { AnnouncementService } from '../../providers/announcement.service';
import { CampusInfo } from '../../providers/campusInfo';
import { UserInfo } from '../../providers/userInfo';

import { AnnouncementDetailPage } from '../announcement-detail/announcement-detail';
import { AnnouncementSearchPage } from '../announcement-search/announcement-search';

@Component({
  selector: 'page-announcement-list',
  templateUrl: 'announcement-list.html'
})
export class AnnouncementListPage {

  public announcements: Announcement[];

  constructor(private navParams: NavParams,
    private navCtrl: NavController,
    private announcementService: AnnouncementService) {

  }


  ionViewDidLoad() {
  }

  ngOnInit(): void {
    this.getAnnouncements();
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.announcements = [];
      this.getAnnouncements();
      refresher.complete();
    }, 500);
  }

  getAnnouncements(): void {
    this.announcementService.getAnnouncements().then((announcements: Announcement[]) => this.announcements = announcements);
  }

  // doSearch(ev): void {
  //   var val = ev.target.value;
  //   if (val && val.trim() != '') {
  //     this.announcements = this.announcements.filter((item) => {
  //       return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
  //     })
  //   } else {
  //     this.getAnnouncements();
  //   }
  // }

  openDetailPage(announcementId: string | number): void {
    this.navCtrl.push(AnnouncementDetailPage, announcementId);
  }

  openSearch() {
    this.navCtrl.push(AnnouncementSearchPage);
  }
}
