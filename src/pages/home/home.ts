import { Component, ViewChild, Input, OnInit } from '@angular/core';

import { NavController, NavParams, App, ModalController } from 'ionic-angular';
import { UserAvatarComponent } from '../../components/user-avatar/user-avatar';

import { BookmarkListPage } from '../bookmark-list/bookmark-list';
import { AnnouncementListPage } from '../announcement-list/announcement-list';
import { EventListPage } from '../event-list/event-list';

import { UserInfo } from '../../providers/userInfo';
import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, USER_INFO, CAMPUS_DESIGN } from '../../providers/storage.service';
import { AnnouncementService } from '../../providers/announcement.service';
import { IS_USING_REAL_DATA } from '../../providers/tcc.service';
// import { LocalNotifications } from 'ionic-native';

import { LocalNotificationListPage } from '../local-notification-list/local-notification-list';
import { NotificationListPage } from '../notification-list/notification-list'

import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';

import { ProfilePage } from '../profile/profile';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    tabsArray = ['bookmark', 'announcement', 'event'];
    tab: string = this.tabsArray[0];
    userInfo: UserInfo = null;
    campusDesign: CampusDesign = null;

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
        public navController: NavController,
        public navParams: NavParams,
        private nativePageTransitions: NativePageTransitions,
        public storageService: StorageService,
        public modalCtrl: ModalController,
        public appCtrl: App,
        public announcementService: AnnouncementService) {
    }

    ngOnInit(): void {

        this.campusDesign = this.storageService.get(CAMPUS_DESIGN);

        var self = this;
        // setInterval(function () {
        //     self.announcementService.getNewAnnouncements().then((announcements: any) => {
        //         if (announcements.length > 0) {
        //             var unreadAnnCount = 0;
        //             announcements.forEach(function (announcement) {
        //                 var hasNotified = false;
        //                 self.notifiedIds.forEach(function (id) {
        //                     if (id == announcement.id) {
        //                         hasNotified = true;
        //                     }
        //                 });
        //                 if (!hasNotified) {
        //                     self.notifiedIds.push(announcement.id);
        //                     unreadAnnCount++;
        //                 }
        //             });
        //             if (unreadAnnCount > 0) {
        //                 self.hasNewAnnouncements = true;
        //                 console.log("Unread " + unreadAnnCount)
        //                 LocalNotifications.schedule({
        //                     title: "TCC Announcements",
        //                     text: "You have got new announcements. Please check it.",
        //                     badge: unreadAnnCount
        //                 });
        //             }
        //         }
        //     });
        // }, 30000);

        // LocalNotifications.on("click", (notification, state) => {
        //     let modal = this.modalCtrl.create(LocalNotificationListPage);
        //     modal.present();
        // });
    }

    ionViewDidLoad(): void {
    }

    doRefresh(refresher) {
        if (this.tab == "announcement") {
            this.announcementListPage.doRefresh(refresher);
        } else if (this.tab == "bookmark") {
            this.bookmarkListPage.doRefresh(refresher);
        } else if (this.tab == "event") {
            this.eventListPage.doRefresh(refresher);
        }
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

    calloutSearchPage() {
        if (this.tab == "announcement") {
            this.announcementListPage.openSearch();
        } else if (this.tab == "bookmark") {
            this.bookmarkListPage.openSearch();
        } else if (this.tab == "event") {
            this.eventListPage.openSearch();
        }
    }

    openCalendarPage() {
        if (this.tab == "event") {
            this.eventListPage.openCalendarPage();
        }
    }

    swipeEvent(event) {

        console.log("Swipe from home.ts");
        let that = this;
        let leftOptions: NativeTransitionOptions = {
            direction: 'left',
            duration: 400,
            // slowdownfactor: 1,
            // slidePixels: 20,
            // iosdelay: 100,
            // androiddelay: 150,
            fixedPixelsTop: 107,
            fixedPixelsBottom: 57
        };

        let rightOptions: NativeTransitionOptions = {
            direction: 'right',
            duration: 400,
            // slowdownfactor: 4,
            // slidePixels: 100,
            // iosdelay: 50,
            // androiddelay: 50,
            fixedPixelsTop: 107,
            fixedPixelsBottom: 57
        };

        if (event.direction == 2) {
            console.log("Swipe to right");

            if (this.tab === 'announcement') {
                this.announcementListPage.announcements = null;
                this.switchEventTab();
                that.nativePageTransitions.slide(leftOptions)
                    .then(() => { });
            } else if (this.tab === 'bookmark') {
                this.bookmarkListPage.bookmarks = null;
                this.switchAnnouncementTab();
                that.nativePageTransitions.slide(leftOptions)
                    .then(() => { });
            }
        }

        if (event.direction == 4) {
            console.log("Swipe to left");

            if (this.tab === 'announcement') {
                this.announcementListPage.announcements = null;
                this.switchBookmarkTab();
                that.nativePageTransitions.slide(rightOptions)
                    .then(() => { });
            } else if (this.tab === 'event') {
                this.eventListPage.bundleEvents = null;
                this.switchAnnouncementTab();
                that.nativePageTransitions.slide(rightOptions)
                    .then(() => { });
            }
        }
    }

    linkToProfile(event) {
        event.stopPropagation();
        this.navController.push(ProfilePage);
    }
}
