import { Component } from '@angular/core';
import { NavController, NavParams, Platform } from 'ionic-angular';

import { SettingNotification } from '../../providers/setting/setting-notification.interface';

import { SettingService } from '../../providers/setting/setting.service';
import { UtilDialogService } from '../../providers/util/util-dialog.service';
import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, CAMPUS_DESIGN } from '../../providers/storage.service';

@Component({
  selector: 'page-setting-push-notification',
  templateUrl: 'setting-push-notification.html',
  providers: [SettingService, UtilDialogService]
})
export class SettingPushNotificationPage {

  private campusDesign: CampusDesign;

  private loaded: boolean = false;

  private setting: SettingNotification;

  private isIOS: boolean;

  private loadSetting(): Promise<any> {
    this.loaded = false;

    return new Promise((reslove, reject) => {
      this.settingServ
        .getNotification()
        .then((response) => {
          this.setting = response;
          this.loaded = true;

          reslove();
        })
        .catch((error) => {
          this.utilDialogServ.showError(error);
          this.loaded = true;

          reject();
        });
    });
  }

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private platform: Platform,
    private storageService: StorageService,
    private utilDialogServ: UtilDialogService,
    private settingServ: SettingService
  ) {
    this.isIOS = platform.is('ios');
  }

  ngOnInit(): void {
    this.campusDesign = this.storageService.get(CAMPUS_DESIGN);
    this.loadSetting().catch(error => {});
  }

  evSave(): void {
    let loading = this.utilDialogServ.getLoading();

    loading.show();

    this.settingServ
      .setNotification(this.setting)
      .then(() => {
        loading.hide();

        this.navCtrl.pop();
      })
      .catch((error) => {
        loading.hide();

        this.utilDialogServ.showError(error);
      });
  }
}
