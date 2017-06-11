import { Component } from '@angular/core';
import { NavParams, ViewController, NavController, ToastController } from 'ionic-angular';
import { Calendar } from '@ionic-native/calendar';
import { Announcement } from '../../providers/announcement';
import { AnnouncementService } from '../../providers/announcement.service';
import { CampusInfo } from '../../providers/campusInfo';
import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, CAMPUS_DESIGN, CAMPUS_INFO } from '../../providers/storage.service';
import { UtilDialogService } from '../../providers/util/util-dialog.service';

@Component({
  selector: 'page-announcement-detail',
  templateUrl: 'announcement-detail.html'
})
export class AnnouncementDetailPage {

  announcement: Announcement;
  campusDesign: CampusDesign;
  campusInfo: CampusInfo

  constructor(
    private navCtrl: NavController,
    private params: NavParams,
    private calendar: Calendar,
    private toastCtrl: ToastController,
    private viewCtrl: ViewController,
    private utilDialogServ: UtilDialogService,
    private storageService: StorageService,
    private announcementService: AnnouncementService) {
  }

  ngOnInit(): void {
    this.getAnnouncement(this.params.get('announcementId'));
    this.campusDesign = this.storageService.get(CAMPUS_DESIGN);
    this.campusInfo = this.storageService.get(CAMPUS_INFO);
  }

  ionViewWillLeave() {
  }

  getAnnouncement(announcementId: string): void {
    this.announcementService.getAnnouncement(announcementId).then(
      (announcement: Announcement) => {
        this.announcement = announcement;
        announcement.detail = announcement.detail.replace(/(?:img|IMG) src="([\s\S]*?)"/g, `img src="${this.campusInfo.host}/$1"`);
        announcement.detail = announcement.detail.replace(/(?:source|SOURCE) src="([\s\S]*?)"/g, `source src="${this.campusInfo.host}/$1"`);
      }).catch((error) => {
        this.utilDialogServ.showError(error);
      });
  }

  dismiss() {
    this.navCtrl.pop();
  }

  download(): void {
    this.calendar
      .createEvent(this.announcement.title, "", this.announcement.detail, this.announcement.postedDate, null)
      .then(() => this.showDLSucMsg())
      .catch((error) => {
        this.utilDialogServ.showError(error);
      });
  }

  showDLSucMsg(): void {
    let toast = this.toastCtrl.create({
      message: 'You have imported the event into your mobile calendar successfully!',
      duration: 3000
    });
    toast.present();
  }
}
