import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';

import { Notification } from '../../providers/notification';
import { Bookmark } from '../../providers/bookmark';
import { NotificationService } from '../../providers/notification.service';
import { BookmarkService } from '../../providers/bookmark.service';

import { NotificationDetailPage } from '../notification-detail/notification-detail';
import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, CAMPUS_DESIGN } from '../../providers/storage.service';

import { BookmarkListPage } from '../bookmark-list/bookmark-list';
import { AnnouncementDetailPage } from '../announcement-detail/announcement-detail';
import { EventDetailPage } from '../event-detail/event-detail';
import { UtilDialogService } from '../../providers/util/util-dialog.service';

@Component({
  selector: 'page-notification-list',
  templateUrl: 'notification-list.html'
})
export class NotificationListPage {

  notifications: Notification[];
  notificationData: any = { size: 0 };
  campusDesign: CampusDesign;
  bookmarkListPage: BookmarkListPage;

  constructor(private navCtrl: NavController,
    private navParams: NavParams,
    private alertCtrl: AlertController,
    private utilDialogServ: UtilDialogService,
    private storageService: StorageService,
    private bookmarkService: BookmarkService,
    private notificationService: NotificationService) {
  }

  doInfinite(infiniteScroll: any) {
    console.log('Begin infinite operation');

    setTimeout(() => {
      this.getNotifications(infiniteScroll);

      console.log('Async operation has ended');
      infiniteScroll.complete();
    }, 500);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationListPage');
  }

  ionViewDidLeave() {
    this.notificationService.getNotificationNumber().then(count => {
      this.navParams.data.size = count;
    }).catch((error) => {
      this.utilDialogServ.showError(error);
    });
  }

  getNotifications(infiniteScroll?: any): void {
    var length = 0;
    if (this.notifications != null) {
      length = this.notifications.length;
    }
    this.notificationService.getNotifications(length + 1).then(
      (notifications: Notification[]) => {
        this.load(notifications);
        if (infiniteScroll && (notifications == null || notifications.length == 0)) {
          infiniteScroll.enable(false);
        }
      })
      .catch((error) => {
        this.utilDialogServ.showError(error);
      });
  }

  ngOnInit(): void {
    this.campusDesign = this.storageService.get(CAMPUS_DESIGN);
    this.getNotifications();
  }

  load(notifications: Notification[]) {
    if (this.notifications == null) {
      this.notifications = new Array<Notification>();
    }
    if (notifications != null && notifications.length > 0) {
      for (let i = 0; i < notifications.length; i++) {
        this.notifications.push(notifications[i]);
      }
    }

    this.navParams.data.size = this.notificationService.getNotificationNumber();
  }

  delete(objectId: string, type:string, title: string): void {

    let alert = this.alertCtrl.create({
      title: 'Confirm Message',
      message: `Do you want to delete the notification ` + "'" + title + "'?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.notificationService.delete(objectId, type).then(() => {
              for (var i = 0; i < this.notifications.length; i++) {
                if (this.notifications[i].objectId == objectId
                  && this.notifications[i].type == type) {
                  this.notifications.splice(i, 1);
                  break;
                }
              }
              // this.notificationData.size = this.notifications.length;
            }).catch((error) => {
              this.utilDialogServ.showError(error);
            });
          }
        }
      ]
    });
    alert.present();
  }

  clearAll(): void {
    let alert = this.alertCtrl.create({
      title: 'Confirm Message',
      message: 'Do you want to clear all notifications?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.notificationService.clearAll().then(() => {
              this.notifications = null;
              this.load(this.notifications);
            }).catch((error) => {
              this.utilDialogServ.showError(error);
            });
          }
        }
      ]
    });
    alert.present();
  }

  openDetailPage(notification: Notification): void {
    if (notification.type === 'bookmark') {
      alert(notification.objectId)
      this.bookmarkService.getBookmark(notification.objectId).then((bookmark: Bookmark) => {        
        this.bookmarkListPage.launchFromThemeableBrowser(bookmark);
      }).catch((error) => {
        this.utilDialogServ.showError(error);
      });
    } else if (notification.type === 'announcement') {
      this.navCtrl.push(AnnouncementDetailPage, notification.objectId);
    } else if (notification.type === 'calendar') {
      this.navCtrl.push(EventDetailPage, notification.objectId);
    } 
  }
}
