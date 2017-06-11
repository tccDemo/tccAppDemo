import { NgModule, ErrorHandler, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { UserAvatarComponent } from '../components/user-avatar/user-avatar';
import { NotificationListPage } from '../pages/notification-list/notification-list';
import { NotificationDetailPage } from '../pages/notification-detail/notification-detail';
import { AnnouncementListPage } from '../pages/announcement-list/announcement-list';
import { AnnouncementSearchPage } from '../pages/announcement-search/announcement-search';
import { AnnouncementDetailPage } from '../pages/announcement-detail/announcement-detail';
import { LocalNotificationListPage } from '../pages/local-notification-list/local-notification-list';
import { AppUpdatePage } from '../pages/app-update/app-update';

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { BookmarkManagePage } from '../pages/bookmark-manage/bookmark-manage';
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
import { StartupPage } from '../pages/startup/startup';

import { ForgotPasswordPage } from '../pages/forgot-password/forgot-password';
import { ForgotPasswordChangePage } from '../pages/forgot-password-change/forgot-password-change';
import { ForgotPasswordHintPage } from '../pages/forgot-password-hint/forgot-password-hint';
import { ForgotPasswordSuccessPage } from '../pages/forgot-password-success/forgot-password-success';

import { CalendarSubscriptionPage } from '../pages/calendar-subscription/calendar-subscription';
import { SettingPushNotificationPage } from '../pages/setting-push-notification/setting-push-notification';
import { UserChangePasswordPage } from '../pages/user-change-password/user-change-password';
import { ProfileEducationPage } from '../pages/profile-education/profile-education';
import { ProfileEducationDetailPage } from '../pages/profile-education-detail/profile-education-detail';
import { ProfilePage } from '../pages/profile/profile';
import { ProfileWorkExperiencePage } from '../pages/profile-work-experience/profile-work-experience';
import { ProfileWorkExperienceDetailPage } from '../pages/profile-work-experience-detail/profile-work-experience-detail';
import { TextareaEditPage } from '../pages/textarea-edit/textarea-edit';
import { SelectEditPage } from '../pages/select-edit/select-edit';

import { BookmarkFilterComponent } from '../components/bookmark-filter/bookmark-filter';

import { AppInfoService } from '../providers/appInfo.service';
import { NotificationService } from '../providers/notification.service';
import { AnnouncementService } from '../providers/announcement.service';
import { BookmarkService } from '../providers/bookmark.service';
import { EventService } from '../providers/event.service';
import { UserInfoService } from '../providers/userInfo.service';
import { CampusInfoService } from '../providers/campusInfo.service';
import { StorageService } from '../providers/storage.service';

import { UtilLogService } from '../providers/util/util-log.service';
import { UtilDialogService } from '../providers/util/util-dialog.service';
import { Keyboard } from '@ionic-native/keyboard';
import { AuthStorageService } from '../providers/auth/auth-storage.service';
import { ResourceService } from '../providers/resource/resource.service';
import { ResourceKeygenService } from '../providers/resource/resource-keygen.service';

import { Calendar } from '@ionic-native/calendar';
import { NgCalendarModule } from 'ionic2-calendar';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';
import { Camera } from '@ionic-native/camera';
import { Transfer } from '@ionic-native/transfer';
import { File } from '@ionic-native/file';

import { Logger, Options as LoggerOptions, Level as LoggerLevel } from "angular2-logger/core";
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { ImgCacheService } from '../providers/imgCache/imgCache.service';

import { LazyLoadDirective } from '../components/img-lazy-load/LazyLoadDirective' 
import { Network } from '@ionic-native/network';
import { NetWorkChecker } from '../providers/network-checker';
import { FCM } from '@ionic-native/fcm';
@NgModule({
  imports: [
    // IonicModule.forRoot(MyApp), //{passThruUnknownUrl: true}
     IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages: 'true'     //隐藏全部子页面tabs
    }),
    NgCalendarModule,
    BrowserAnimationsModule,
    HttpModule
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
    BookmarkManagePage,
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
    StartupPage,
    ForgotPasswordPage,
    ForgotPasswordChangePage,
    ForgotPasswordHintPage,
    ForgotPasswordSuccessPage,
    CalendarSubscriptionPage,
    SettingPushNotificationPage,
    UserChangePasswordPage,
    ProfileEducationPage,
    ProfileEducationDetailPage,
    ProfilePage,
    ProfileWorkExperiencePage,
    ProfileWorkExperienceDetailPage,
    TextareaEditPage,
    SelectEditPage,
    AppUpdatePage,
    BookmarkFilterComponent,
    LazyLoadDirective
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
    BookmarkManagePage,
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
    StartupPage,
    ForgotPasswordPage,
    ForgotPasswordChangePage,
    ForgotPasswordHintPage,
    ForgotPasswordSuccessPage,
    CalendarSubscriptionPage,
    SettingPushNotificationPage,
    UserChangePasswordPage,
    ProfileEducationPage,
    ProfileEducationDetailPage,
    ProfilePage,
    ProfileWorkExperiencePage,
    ProfileWorkExperienceDetailPage,
    TextareaEditPage,
    SelectEditPage,
    AppUpdatePage,
    BookmarkFilterComponent
    
  ],
  providers: [
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    { provide: LoggerOptions, useValue: { level: LoggerLevel.LOG } },
    Logger,
    Device,
    Camera,
    Transfer,
    File,
    NotificationService,
    AnnouncementService,
    BookmarkService,
    EventService,
    UserInfoService,
    CampusInfoService,
    StorageService,
    AppVersion,
    AppInfoService,
    UtilDialogService,
    AuthStorageService,
    ResourceService,
    ResourceKeygenService,
    UtilLogService,
    FCM,
    Calendar,
    ImgCacheService,
    Keyboard,
    Network,
    NetWorkChecker,
    NativePageTransitions
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [IonicApp]
})
export class AppModule {
}
