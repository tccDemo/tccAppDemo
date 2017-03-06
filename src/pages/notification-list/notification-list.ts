import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {Notification} from '../../providers/notification';
import {NotificationService} from '../../providers/notification.service';

import {NotificationDetailPage} from '../notification-detail/notification-detail';

@Component({
  selector: 'page-notification-list',
  templateUrl: 'notification-list.html'
})
export class NotificationListPage {

  public notifications: Notification[];
  notificationData: any = {size: 0};

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private notificationService: NotificationService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationListPage');
  }

  ionViewDidLeave() {
    this.navParams.data.size = this.notificationService.getNotificationNumber();
  }

  getNotifications(): void {
    this.notificationService.getNotifications().then((notifications: Notification[]) => this.load(notifications));
  }

  ngOnInit(): void {
    this.getNotifications();
  }

  load(notifications: Notification[]) {
    console.log("load");
    this.notifications = notifications;
    this.navParams.data.size = this.notificationService.getNotificationNumber();
  }

  delete(notificationId: string | number): void {
    this.notificationService.delete(notificationId).then((notifications: Notification[]) => this.load(notifications));
    this.notificationData.size = this.notificationService.getNotificationNumber();
  }

  clearAll(): void {
    this.notificationService.clearAll().then((notifications: Notification[]) => this.load(notifications));
  }

  openDetailPage(notificationId: string | number): void {
    this.navCtrl.push(NotificationDetailPage, notificationId);
  }

}
