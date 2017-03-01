import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { NotificationListPage } from '../pages/notification-list/notification-list';
import { NotificationDetailPage } from '../pages/notification-detail/notification-detail';
import { AnnouncementListPage } from '../pages/announcement-list/announcement-list';
import { AnnouncementDetailPage } from '../pages/announcement-detail/announcement-detail';
import { BookmarkListPage } from '../pages/bookmark-list/bookmark-list';
import { EventListPage } from '../pages/event-list/event-list';
import { EventDetailPage } from '../pages/event-detail/event-detail';
import { EventCalendarPage } from '../pages/event-calendar/event-calendar';

import { SettingPage } from '../pages/setting/setting';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';

import { BookmarkFilterComponent } from '../components/bookmark-filter/bookmark-filter';

import { NotificationService } from '../providers/notification.service';
import { AnnouncementService } from '../providers/announcement.service';
import { BookmarkService } from '../providers/bookmark.service';
import { EventService } from '../providers/event.service';

import { NgCalendarModule  } from 'ionic2-calendar';
import { DragulaService,DragulaModule } from 'ng2-dragula';

@NgModule({
  declarations: [
    MyApp,
    NotificationListPage,
    NotificationDetailPage,
    AnnouncementListPage,
    AnnouncementDetailPage,
    BookmarkListPage,
    EventListPage,
    EventDetailPage,
    EventCalendarPage,
    SettingPage,
    HomePage,
    TabsPage,
    LoginPage,
    BookmarkFilterComponent
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    NgCalendarModule,
    DragulaModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    NotificationListPage,
    NotificationDetailPage,
    AnnouncementListPage,
    AnnouncementDetailPage,
    BookmarkListPage,
    EventListPage,
    EventDetailPage,
    EventCalendarPage,
    SettingPage,
    HomePage,
    TabsPage,
    LoginPage,
    BookmarkFilterComponent
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, NotificationService, 
     AnnouncementService, BookmarkService, EventService, DragulaService],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule {}
