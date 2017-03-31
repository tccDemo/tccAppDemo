import { Component } from '@angular/core';
import { NavController, NavParams, ViewController } from 'ionic-angular';

import { Notification } from '../../providers/notification';
import { NotificationService } from '../../providers/notification.service';
import { appToolBar } from '../../utils/appToolbar';

@Component({
  selector: 'page-notification-detail',
  templateUrl: 'notification-detail.html'
})
export class NotificationDetailPage {

  notification: Notification;

  constructor(
    private navCtrl: NavController,
    private params: NavParams,
    private viewCtrl: ViewController,
    private notificationService: NotificationService
  ) { }

  ionViewDidLoad() {

  }

  ngOnInit(): void {
    let notificationId = this.params.get('notificationId');
    this.getNotification(notificationId);
    this.notificationService.markRead(notificationId);
    appToolBar.hideTabsBar();
  }


  ionViewWillLeave() {
    appToolBar.showTabsBar();
  }

  getNotification(notificationId: number): void {
    this.notificationService.getNotification(notificationId).then((notification: Notification) => this.notification = notification);
  }

  dismiss() {
    this.navCtrl.pop();
  }  
}
