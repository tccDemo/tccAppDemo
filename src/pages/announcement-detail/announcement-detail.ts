import { Component } from '@angular/core';
import { NavParams, ViewController, NavController,ToastController } from 'ionic-angular';
import { Calendar } from 'ionic-native';
import { Announcement } from '../../providers/announcement';
import { AnnouncementService } from '../../providers/announcement.service';
import { appToolBar } from '../../utils/appToolbar';

@Component({
  selector: 'page-announcement-detail',
  templateUrl: 'announcement-detail.html'

})
export class AnnouncementDetailPage {

  announcement: Announcement;

  constructor(private navCtrl: NavController,
    private params: NavParams,
    private toastCtrl: ToastController,
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
    this.announcementService.getAnnouncement(announcementId).then(
      (announcement: Announcement) => {
        this.announcement = announcement;
        announcement.detail = announcement.detail.replace(/(?:img|IMG) src="([\s\S]*?)"/g, 'img src="\http://ccstage.campuscruiser.com/$1\"')
      });
  }

  dismiss() {
    this.navCtrl.pop();
  }

  download(): void {
    Calendar.createEvent(this.announcement.title,  "",  this.announcement.detail, this.announcement.postedAt, null).then(() => this.showDLSucMsg());
  }

  showDLSucMsg(): void {
    let toast = this.toastCtrl.create({
      message: 'You have imported the event into your mobile calendar successfully!',
      duration: 3000
    });
    toast.present();    
  }  
}
