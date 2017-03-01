import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Notification } from './notification';
import { NOTIFICATIONS } from './mock-notification';

declare var $:any;

@Injectable()
export class NotificationService {

  constructor(private http: Http) {}

  getNotificationsByName(term: string): Promise<Notification[]> {
    return Promise.resolve(NOTIFICATIONS).then(notifications => 
      notifications.find(notification => notification.name.indexOf(term)!=-1));   
  }

  getNotifications(): Promise<Notification[]> {
    return Promise.resolve(NOTIFICATIONS);
  }

  getNotification(id: number): Promise<Notification> {
    return Promise.resolve(NOTIFICATIONS).then(notifications => notifications.find(notification => notification.id == +id));   
  }

  delete(id: string | number): Promise<Notification[]> {
    for (var i = 0; i < NOTIFICATIONS.length; i++) {
      if (NOTIFICATIONS[i].id == id) {
        NOTIFICATIONS.splice(i,1);
      }
    }
    return this.getNotifications();
  }  

  clearAll():Promise<Notification[]> {
    NOTIFICATIONS.splice(0,NOTIFICATIONS.length);
    return this.getNotifications();
  }
}