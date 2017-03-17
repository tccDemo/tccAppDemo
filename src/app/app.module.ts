import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { UserAvatarComponent } from '../components/user-avatar/user-avatar';
import { NotificationListPage } from '../pages/notification-list/notification-list';
import { NotificationDetailPage } from '../pages/notification-detail/notification-detail';
import { AnnouncementListPage } from '../pages/announcement-list/announcement-list';
import { AnnouncementSearchPage } from '../pages/announcement-search/announcement-search';
import { AnnouncementDetailPage } from '../pages/announcement-detail/announcement-detail';
import { LocalNotificationListPage } from '../pages/local-notification-list/local-notification-list';

import { BookmarkListPage } from '../pages/bookmark-list/bookmark-list';
import { BookmarkSearchPage } from '../pages/bookmark-search/bookmark-search';
import { EventListPage } from '../pages/event-list/event-list';
import { EventDetailPage } from '../pages/event-detail/event-detail';
import { EventSearchPage } from '../pages/event-search/event-search';
import { EventCalendarPage } from '../pages/event-calendar/event-calendar';


import { SettingPage } from '../pages/setting/setting';
import { HomePage } from '../pages/home/home';
import { FooterPage } from '../pages/footer/footer';
import { LoginPage } from '../pages/login/login';

import { BookmarkFilterComponent } from '../components/bookmark-filter/bookmark-filter';

import { NotificationService } from '../providers/notification.service';
import { AnnouncementService } from '../providers/announcement.service';
import { BookmarkService } from '../providers/bookmark.service';
import { EventService } from '../providers/event.service';
import { UserInfoService } from '../providers/userInfo.service';
import { CampusInfoService } from '../providers/campusInfo.service';
import { StorageService } from '../providers/storage.service';
import { TCCData } from '../providers/tcc.service';

import { NgCalendarModule } from 'ionic2-calendar';
import { DragulaService, DragulaModule } from 'ng2-dragula';

@NgModule({
    imports: [
        IonicModule.forRoot(MyApp), //{passThruUnknownUrl: true}
        NgCalendarModule,
        DragulaModule
    ],
    declarations: [
        MyApp,
        UserAvatarComponent,
        NotificationListPage,
        NotificationDetailPage,
        AnnouncementListPage,
        AnnouncementSearchPage,
        AnnouncementDetailPage,
        LocalNotificationListPage,
        BookmarkListPage,
        BookmarkSearchPage,
        EventListPage,
        EventDetailPage,
        EventCalendarPage,
        EventSearchPage,
        SettingPage,
        HomePage,
        FooterPage,
        LoginPage,
        BookmarkFilterComponent
    ],
    entryComponents: [
        MyApp,
        UserAvatarComponent,
        NotificationListPage,
        NotificationDetailPage,
        AnnouncementListPage,
        AnnouncementSearchPage,
        AnnouncementDetailPage,
        LocalNotificationListPage,
        BookmarkListPage,
        BookmarkSearchPage,
        EventListPage,
        EventDetailPage,
        EventCalendarPage,
        EventSearchPage,
        SettingPage,
        HomePage,
        FooterPage,
        LoginPage,
        BookmarkFilterComponent
    ],
    providers: [{ provide: ErrorHandler, useClass: IonicErrorHandler }, NotificationService,
        AnnouncementService, BookmarkService, EventService, DragulaService, UserInfoService,
        CampusInfoService, StorageService, TCCData],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    bootstrap: [IonicApp]
})
export class AppModule {
}
