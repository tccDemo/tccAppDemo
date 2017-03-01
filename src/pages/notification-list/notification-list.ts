import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { Notification } from '../../providers/notification';
import { NotificationService } from '../../providers/notification.service';

import { NotificationDetailPage } from '../notification-detail/notification-detail';

@Component({
  selector: 'page-notification-list',
  templateUrl: 'notification-list.html'
})
export class NotificationListPage {


  notifications: Notification[];

  constructor(private navCtrl: NavController, private navParams: NavParams, 
  	private notificationService: NotificationService, private modalCtrl: ModalController){}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationListPage');
  }

  
  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(): void {
    this.notificationService.getNotifications().then( (notifications:Notification[]) => this.notifications = notifications);
  }

  delete(notificationId: string | number):void {
  	this.notificationService.delete(notificationId).then( (notifications:Notification[]) => this.notifications = notifications);
 }

  clearAll():void{
  	this.notificationService.clearAll().then( (notifications:Notification[]) => this.notifications = notifications);
  }

  openDetailModal(notificationId: string | number):void {
    let modal = this.modalCtrl.create(NotificationDetailPage, notificationId);
    modal.present();
  }

}
