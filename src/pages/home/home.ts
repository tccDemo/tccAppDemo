import {Component, ViewChild,Input} from '@angular/core';

import {NavController} from 'ionic-angular';
import {UserAvatarComponent} from '../../components/user-avatar/user-avatar';

import {BookmarkListPage} from '../bookmark-list/bookmark-list';
import {AnnouncementListPage} from '../announcement-list/announcement-list';
import {EventListPage} from '../event-list/event-list';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    tab: string = "bookmark";

    @ViewChild(UserAvatarComponent)
    userAvatar: UserAvatarComponent;

    @ViewChild(BookmarkListPage)
    bookmarkListPage: BookmarkListPage;

    @ViewChild(AnnouncementListPage)
    announcementListPage: AnnouncementListPage;

    @ViewChild(EventListPage)
    eventListPage: EventListPage;

    constructor(public navCtrl: NavController) {

    }

}
