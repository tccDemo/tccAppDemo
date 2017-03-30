import { Component, ViewChild, Input, OnInit } from '@angular/core';

import { NavController, NavParams, App, ModalController } from 'ionic-angular';
import { UserAvatarComponent } from '../../components/user-avatar/user-avatar';

import { BookmarkListPage } from '../bookmark-list/bookmark-list';
import { AnnouncementListPage } from '../announcement-list/announcement-list';
import { EventListPage } from '../event-list/event-list';

import { UserInfo } from '../../providers/userInfo';
import { StorageService, USER_INFO } from '../../providers/storage.service';
import { AnnouncementService } from '../../providers/announcement.service';
import { IS_USING_REAL_DATA } from '../../providers/tcc.service';
import { LocalNotifications } from 'ionic-native';

import { LocalNotificationListPage } from '../local-notification-list/local-notification-list';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    tabsArray = ['bookmark', 'announcement', 'event'];
    tab: string = this.tabsArray[0];
    userInfo: UserInfo = null;

    @ViewChild(UserAvatarComponent)
    userAvatar: UserAvatarComponent;

    @ViewChild(BookmarkListPage)
    bookmarkListPage: BookmarkListPage;

    @ViewChild(AnnouncementListPage)
    announcementListPage: AnnouncementListPage;

    @ViewChild(EventListPage)
    eventListPage: EventListPage;

    hasNewAnnouncements: boolean = true;
    hasNewEvents: boolean = true;
    notifiedIds: Array<number> = new Array;

    constructor(
        public announcementService: AnnouncementService,
        public navController: NavController,
        public navParams: NavParams,
        public storageService: StorageService,
        public modalCtrl: ModalController,
        public appCtrl: App) {

        let preTab = navParams.get('tab');
        if (preTab) {
            this.tab = preTab;
        }


        var self = this;
        setInterval(function () {
            self.announcementService.getNewAnnouncements().then((announcements: any) => {
                if (announcements.length > 0) {
                    var unreadAnnCount = 0;
                    announcements.forEach(function (announcement) {
                        var hasNotified = false;
                        self.notifiedIds.forEach(function (id) {
                            if (id == announcement.id) {
                                hasNotified = true;
                            }
                        });
                        if (!hasNotified) {
                            self.notifiedIds.push(announcement.id);
                            unreadAnnCount++;
                        }
                    });
                    if (unreadAnnCount > 0) {
                        self.hasNewAnnouncements = true;
                        console.log("Unread " + unreadAnnCount)
                        LocalNotifications.schedule({
                            title: "TCC Announcements",
                            text: "You have got new announcements. Please check it.",
                            badge: unreadAnnCount
                        });
                    }
                }
            });
        }, 10000);

    }

    ngOnInit(): void {
        LocalNotifications.on("click", (notification, state) => {
            // this.navController.push(HomePage, { tab: 'announcement' });
            // this.appCtrl.getRootNav().push(LocalNotificationListPage);
            let modal = this.modalCtrl.create(LocalNotificationListPage);
            modal.present();
        });
    }

    ionViewDidLoad(): void {
        // let sentNotification = this.storageService.get("sentNotification");
        // if (!sentNotification) {
        //     // LocalNotifications.schedule({
        //     //     title: "TCC Announcements",
        //     //     text: "You have got new announcements. Please check it.",
        //     //     badge: 10
        //     // });
        //     this.storageService.set("sentNotification", true);
        // }
    }

    switchEventTab(): void {
        this.tab = "event";
        this.clearNewEvents();
    }

    switchAnnouncementTab(): void {
        this.tab = "announcement";
        this.markAnnouncementsRead();
    }

    switchBookmarkTab(): void {
        this.tab = "bookmark";
    }

    markAnnouncementsRead(): void {
        // this.announcementService.markAllRead().then(() => {
        this.hasNewAnnouncements = false;
        // });
    }

    clearNewEvents(): void {
        this.hasNewEvents = false;
    }

    ionViewDidEnter() {
        this.userInfo = this.storageService.get(USER_INFO);
    }

    swipeEvent(event) {
        //swipe left
        if (event.direction == 2) {
            if (this.tabsArray.indexOf(this.tab) < 2) {
                this.tab = this.tabsArray[this.tabsArray.indexOf(this.tab) + 1];
            }
        }
        //swipe right
        if (event.direction == 4) {
            if (this.tabsArray.indexOf(this.tab) > 0) {
                this.tab = this.tabsArray[this.tabsArray.indexOf(this.tab) - 1];
            }
        }
    }
}
