import { Component, ViewChild } from '@angular/core';
import { Platform, ToastController, Nav, IonicApp } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { FooterPage } from '../pages/footer/footer';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { StartupPage } from '../pages/startup/startup';
import { AppUpdatePage } from '../pages/app-update/app-update';
import { NotificationListPage } from '../pages/notification-list/notification-list';
import { SettingPage } from '../pages/setting/setting';
import { AuthService } from '../providers/auth/auth.service';
import { AppVersion } from '@ionic-native/app-version';
import { AppInfoService } from '../providers/appInfo.service';
import { FCMService } from '../providers/fcm.service';
import { NetWorkChecker } from '../providers/network-checker';

@Component({
  templateUrl: 'app.html',
  providers: [AuthService, StatusBar, SplashScreen, FCMService]
})
export class MyApp {
  rootPage: any = null;
  backButtonPressed: boolean = false;
  @ViewChild('myNav') nav: Nav;

  constructor(
    private ionicApp: IonicApp,
    private toastCtrl: ToastController,
    private netWorkChecker: NetWorkChecker,
    private platform: Platform,
    private appVersion: AppVersion,
    private appInfoService: AppInfoService,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private authServ: AuthService,
    private fcmService: FCMService
  ) {
    platform.ready().then(() => {

      this.nav.setRoot(StartupPage);

      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.registerBackButtonAction();

      if (this.authServ.isAuth()) {
        this.nav.setRoot(FooterPage);
      } else {
        this.nav.setRoot(StartupPage);
      }

      try {
        this.fcmService.setupNotifications();
      } catch (e) {
        console.log(e.message);
      }


      // appVersion.getVersionNumber().then(function (v) {
      //   alert("getVersionNumber:" + v);
      // });
      // appVersion.getVersionCode().then(function (v) {
      //   alert("getVersionCode:" + v);
      // })

      // this.appInfoService.getAppInfo().then((appInfo) => {
      //   appVersion.getVersionCode().then((v) => {
      //     if (appInfo.versionCode < v) {
      //       this.rootPage = AppUpdatePage;
      //     }
      //   })
      // });
    });
  }

  registerBackButtonAction() {

    this.platform.registerBackButtonAction(() => {

      if (!this.authServ.isAuth()) {
        return this.nav.setRoot(StartupPage);
      }

      let activePortal = this.ionicApp._modalPortal.getActive();
      if (activePortal) {
        activePortal.dismiss().catch(() => { });
        activePortal.onDidDismiss(() => { });
        return;
      }
      let activeVC = this.nav.getActive();
      let tabs = activeVC.instance.tabs;
      let activeNav = tabs.getSelected();
      if (activeNav.canGoBack()) {
        return activeNav.pop();
      } else {
        return this.nav.setRoot(FooterPage);
      }

    }, 1);
  }

  showExit() {
    if (this.backButtonPressed) {
      this.platform.exitApp();
    } else {
      this.toastCtrl.create({
        message: 'Exit Strata Go when you press again',
        duration: 2000,
        position: 'top'
      }).present();
      this.backButtonPressed = true;
      setTimeout(() => {
        this.backButtonPressed = false, 2000
      });
    }
  }
}
