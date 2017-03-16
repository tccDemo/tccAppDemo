import { Component, ViewChild, Input, OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { UserAvatarComponent } from '../../components/user-avatar/user-avatar';

import { BookmarkListPage } from '../bookmark-list/bookmark-list';
import { AnnouncementListPage } from '../announcement-list/announcement-list';
import { EventListPage } from '../event-list/event-list';

import { UserInfo } from '../../providers/userInfo';
import { StorageService, USER_INFO } from '../../providers/storage.service';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

   // tab: string = "bookmark";
  tabsArray = ['bookmark','announcement','event'];
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

    constructor(public navCtrl: NavController,
        public storageService: StorageService) {

    }

    ngOnInit(): void {
        this.userInfo = this.storageService.get(USER_INFO);
    }

    clearNewAnnouncements(): void {
        this.hasNewAnnouncements = false;
    }

    clearNewEvents(): void {
        this.hasNewEvents = false;
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
