import { Component } from '@angular/core';
import { NavController, NavParams,ViewController } from 'ionic-angular';

import { Notification } from '../../providers/notification';
import { NotificationService } from '../../providers/notification.service';

@Component({
  selector: 'page-notification-detail',
  templateUrl: 'notification-detail.html'
})
export class NotificationDetailPage {
  
  notification:Notification;

  constructor(
    private navCtrl: NavController,
    private params: NavParams,
    private viewCtrl: ViewController,
    private notificationService: NotificationService
  	){}

  ionViewDidLoad() {
    
  }

  ngOnInit(): void {
    this.getNotification(this.params.get('notificationId'));
  }

  getNotification(notificationId: number): void {
    this.notificationService.getNotification(notificationId).then( (notification: Notification) => this.notification = notification );
  }
}
