import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { UserAvatarComponent } from '../../components/user-avatar/user-avatar';

import { UserInfo } from '../../providers/userInfo';
import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, USER_INFO, CAMPUS_DESIGN } from '../../providers/storage.service';
import { UtilDialogService } from '../../providers/util/util-dialog.service';

import { ProfilePage } from '../profile/profile';
import { ProfileEducationPage } from '../profile-education/profile-education';
import { ProfileWorkExperiencePage } from '../profile-work-experience/profile-work-experience';
import { UserChangePasswordPage } from '../user-change-password/user-change-password';
import { SettingPushNotificationPage } from '../setting-push-notification/setting-push-notification';
import { CalendarSubscriptionPage } from '../calendar-subscription/calendar-subscription';

@Component({
  selector: 'page-setting',
  templateUrl: 'setting.html',
  providers: [UtilDialogService]
})
export class SettingPage {

  private campusDesign: CampusDesign;
  
  userInfo: UserInfo = null;

  @ViewChild(UserAvatarComponent)
  userAvatar: UserAvatarComponent;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageService: StorageService,    
    private utilDialogServ: UtilDialogService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.storageService.get(USER_INFO);
    this.campusDesign = this.storageService.get(CAMPUS_DESIGN);
  }

  ionViewDidEnter(): void {
    this.userInfo = this.storageService.get(USER_INFO);
  }

  linkToProfile(event): void {
    event.stopPropagation();
    this.navCtrl.push(ProfilePage);
  }

  linkToProfileEducation(): void {
    this.navCtrl.push(ProfileEducationPage);
  }

  linkToProfileWorkExperience(): void {
    this.navCtrl.push(ProfileWorkExperiencePage);
  }

  linkToUserChangePassword(): void {
    this.navCtrl.push(UserChangePasswordPage);
  }

  linkToSettingPushNotification(): void {
    this.navCtrl.push(SettingPushNotificationPage);
  }

  linkToUserCalendarSubscription(): void {
    this.navCtrl.push(CalendarSubscriptionPage);
  }
}
