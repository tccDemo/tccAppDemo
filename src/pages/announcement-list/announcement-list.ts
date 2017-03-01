import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { Announcement } from '../../providers/announcement';
import { AnnouncementService } from '../../providers/announcement.service';

import { AnnouncementDetailPage } from '../announcement-detail/announcement-detail';

@Component({
  selector: 'page-announcement-list',
  templateUrl: 'announcement-list.html'
})
export class AnnouncementListPage {

 
  announcements: Announcement[];

  constructor(private navCtrl: NavController, private navParams: NavParams, 
  	private announcementService: AnnouncementService, private modalCtrl: ModalController){}

  ionViewDidLoad() {
  }
  
  ngOnInit(): void {
    this.getAnnouncements();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);    
    setTimeout(() => {
      this.announcements = [];
      this.getAnnouncements();
      console.log('Async operation has ended');
      refresher.complete();
    }, 500);
  }

  getAnnouncements(): void {
    this.announcementService.getAnnouncements().then( (announcements:Announcement[]) => this.announcements = announcements);
  }

  doSearch(ev): void {
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.announcements = this.announcements.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
    } else {
      this.getAnnouncements();
    }
  }

  openDetailModal(announcementId: string | number):void {
    let modal = this.modalCtrl.create(AnnouncementDetailPage, announcementId);
    modal.present();
  }

}
