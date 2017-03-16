import { Component, ViewChild, Input, OnInit } from '@angular/core';

import { NavController,NavParams } from 'ionic-angular';
import { UserAvatarComponent } from '../../components/user-avatar/user-avatar';

import { BookmarkListPage } from '../bookmark-list/bookmark-list';
import { AnnouncementListPage } from '../announcement-list/announcement-list';
import { EventListPage } from '../event-list/event-list';

import { UserInfo } from '../../providers/userInfo';
import { StorageService, USER_INFO } from '../../providers/storage.service';
import { AnnouncementService } from '../../providers/announcement.service';
import { IS_USING_REAL_DATA } from '../../providers/tcc.service';
import { LocalNotifications } from 'ionic-native';

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
    annNotificationData: any = { size: 0 };

    constructor(
        public announcementService: AnnouncementService,
        public navController: NavController,
        public navParams: NavParams,
        public storageService: StorageService) {

            let preTab = navParams.get('tab');
            if (preTab) {
                this.tab = preTab;
            }
    }

    ngOnInit(): void {
        if (IS_USING_REAL_DATA) {
            // setInterval(this.schedule, 30000);
        }

        LocalNotifications.on("click", (notification, state) => {
            this.navController.push(HomePage, { tab: 'announcement' });
        });
    }

    ionViewDidLoad(): void {
        let sentNotification = this.storageService.get("sentNotification");
        if (!sentNotification) {
            LocalNotifications.schedule({
                title: "TCC Announcements",
                text: "You have got new announcements. Please check it.",
                badge: 10
            });
            this.storageService.set("sentNotification", true);
        }
    }

    markAnnouncementsRead(): void {
        this.announcementService.markAllRead().then(() => {
            this.hasNewAnnouncements = false;
        });
    }

    clearNewEvents(): void {
        this.hasNewEvents = false;
    }

    ionViewDidEnter() {
        this.userInfo = this.storageService.get(USER_INFO);
    }

    updateBadge(): void {
        // this.annNotificationData.size = this.announcementService.getNewCount();
    }

    schedule(): void {
        this.announcementService.getNewAnnouncements().then((announcements: any) => {
            alert(announcements.length)
            if (announcements.length > 0) {
                this.hasNewAnnouncements = true;
                LocalNotifications.schedule({
                    title: "TCC Announcements",
                    text: "You have got new announcements. Please check it.",
                    badge: announcements.length
                });
            } else {
                this.hasNewAnnouncements = false;
            }
        });
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
