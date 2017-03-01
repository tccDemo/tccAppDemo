import { Component } from '@angular/core';
import { NavParams,ViewController } from 'ionic-angular';

import { Notification } from '../../providers/notification';
import { NotificationService } from '../../providers/notification.service';

@Component({
  selector: 'page-notification-detail',
  templateUrl: 'notification-detail.html'
})
export class NotificationDetailPage {
  
  notification:Notification;

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public notificationService: NotificationService
  	){}

  ionViewDidLoad() {
    
  }

  ngOnInit(): void {
    this.getNotification(this.params.get('notificationId'));
  }

  getNotification(notificationId: number): void {
    this.notificationService.getNotification(notificationId).then( (notification: Notification) => this.notification = notification );
  }

  dismiss():void {
    this.viewCtrl.dismiss();
  }
}
