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

  public notifications: Notification[];

  constructor(private navCtrl: NavController, private navParams: NavParams, 
  	private notificationService: NotificationService, private modalCtrl: ModalController){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationListPage');
  }

  ionViewDidLeave(){
    this.navParams.data.size = this.notificationService.getNotificationNumber();
  }
  
  ngOnInit(): void {
    this.getNotifications();
  }

  getNotifications(): void {
    this.notificationService.getNotifications().then( (notifications:Notification[]) => this.load(notifications));
  }

  delete(notificationId: string | number):void {    
  	this.notificationService.delete(notificationId).then( (notifications:Notification[]) => this.load(notifications));
 }

  load(notifications:Notification[]){
    console.log("load");
    this.notifications = notifications;
    this.navParams.data.size = this.notificationService.getNotificationNumber();
  }

  clearAll():void{
  	this.notificationService.clearAll().then( (notifications:Notification[]) => this.load(notifications));
  }

  openDetailPage(notificationId: string | number):void {     
     this.navCtrl.push(NotificationDetailPage, notificationId);     
  }

}
