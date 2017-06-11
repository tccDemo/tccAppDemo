import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

import { Announcement } from '../../providers/announcement';
import { AnnouncementService } from '../../providers/announcement.service';
import { CampusInfo } from '../../providers/campusInfo';
import { UserInfo } from '../../providers/userInfo';

import { AnnouncementDetailPage } from '../announcement-detail/announcement-detail';
import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, CAMPUS_DESIGN } from '../../providers/storage.service';

@Component({
  selector: 'page-local-notification-list',
  templateUrl: 'local-notification-list.html'
})
export class LocalNotificationListPage {

  announcements: Announcement[];
  campusDesign: CampusDesign;

  constructor(private navParams: NavParams,
    private navCtrl: NavController,
    private modalCtrl: ModalController,
    private viewCtrl: ViewController,
    private storageService: StorageService,
    private announcementService: AnnouncementService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocalNotificationListPage');
  }

  ngOnInit(): void {
    this.campusDesign = this.storageService.get(CAMPUS_DESIGN);
    this.getAnnouncements();
  }

  getAnnouncements(): void {
    this.announcementService.getNewAnnouncements().then((announcements: Announcement[]) => this.announcements = announcements);
  }

  openDetailPage(announcementId: string | number): void {
    this.navCtrl.push(AnnouncementDetailPage, announcementId);
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

}
