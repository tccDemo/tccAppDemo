import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

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
    private modalCtrl: ModalController,
    private announcementService: AnnouncementService) {
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

  openDetailPage(announcementId: string | number): void {
    this.navCtrl.push(AnnouncementDetailPage, announcementId);
  }

  openSearch() {
    let modal = this.modalCtrl.create(AnnouncementSearchPage);
    modal.present();
  }
}
