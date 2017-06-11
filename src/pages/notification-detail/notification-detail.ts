import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Notification } from '../../providers/notification';
import { NotificationService } from '../../providers/notification.service';
import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, CAMPUS_DESIGN } from '../../providers/storage.service';

@Component({
  selector: 'page-notification-detail',
  templateUrl: 'notification-detail.html'
})
export class NotificationDetailPage {

  notification: Notification;
  campusDesign: CampusDesign;

  constructor(
    private navCtrl: NavController,
    private params: NavParams,
    private viewCtrl: ViewController,
    private storageService: StorageService,
    private notificationService: NotificationService
  ) { }

  ionViewDidLoad() {

  }

  ngOnInit(): void {
    this.campusDesign = this.storageService.get(CAMPUS_DESIGN);
    this.notification = this.params.get('notification');    
    // this.notificationService.markRead(this.notification);
  }


  ionViewWillLeave() {
  }

  // getNotification(objectId: number, type: string): void {
  //   this.notificationService.getNotification(notificationId).then((notification: Notification) => this.notification = notification);
  // }

  dismiss() {
    this.navCtrl.pop();
  }
}
