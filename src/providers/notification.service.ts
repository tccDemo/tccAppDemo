import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

import {Notification} from './notification';
import {NOTIFICATIONS} from './notification-mock';

declare var $: any;

@Injectable()
export class NotificationService {

  constructor(private http: Http) {
  }

  getNotificationsByName(term: string): Promise<Notification[]> {
    return Promise.resolve(NOTIFICATIONS).then((notifications:any) =>
      notifications.find(notification => notification.name.indexOf(term) != -1));
  }

  getNotifications(): Promise<Notification[]> {
    return Promise.resolve(NOTIFICATIONS);
  }

  getNotificationNumber(): number {
    var ret = 0;
    for (var i = 0; i < NOTIFICATIONS.length; i++) {
      if (NOTIFICATIONS[i].isNew) {
        ret++;
      }
    }
    return ret;
  }

  markRead(id: string | number): void {
    for (var i = 0; i < NOTIFICATIONS.length; i++) {
      if (NOTIFICATIONS[i].id == id) {
        NOTIFICATIONS[i].isNew = false;
      }
    }
  }

  getNotification(id: number): Promise<Notification> {
    return Promise.resolve(NOTIFICATIONS).then(notifications => notifications.find(notification => notification.id == +id));
  }

  delete(id: string | number): Promise<Notification[]> {
    for (var i = 0; i < NOTIFICATIONS.length; i++) {
      if (NOTIFICATIONS[i].id == id) {
        NOTIFICATIONS.splice(i, 1);
      }
    }
    return this.getNotifications();
  }

  clearAll(): Promise<Notification[]> {
    NOTIFICATIONS.splice(0, NOTIFICATIONS.length);
    return this.getNotifications();
  }

  getScheduleNotifications(): Promise<Notification[]>{
    var msgs = new Array();
    for (var i = 0; i < NOTIFICATIONS.length; i++) {
      if (NOTIFICATIONS[i].isNew) {
        msgs.push({
        	id: NOTIFICATIONS[i].id,
        	title: "TCC Notification",
        	text: NOTIFICATIONS[i].name,
        	icon: "",
        	data: {}
        });
      }
    }
    return Promise.resolve(msgs);
  }
}