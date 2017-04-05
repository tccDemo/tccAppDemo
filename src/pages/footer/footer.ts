import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Tabs, ToastController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { NotificationListPage } from '../notification-list/notification-list';
import { SettingPage } from '../setting/setting';

import { NotificationService } from '../../providers/notification.service';

import { LocalNotifications } from 'ionic-native';
// import { Network } from '@ionic-native/network';

@Component({
    templateUrl: 'footer.html'
})

export class FooterPage {

    navRoot1: any = HomePage;
    navRoot2: any = NotificationListPage;
    navRoot3: any = SettingPage;
    notificationData: any = { size: 0 };

    @ViewChild('myTabs') tabRef: Tabs;

    constructor(
        private notificationService: NotificationService,
        // private network: Network,
        private toastCtrl: ToastController,
        private navController: NavController) {

        // LocalNotifications.on("click", (notification, state) => {
        //     this.navController.push(NotificationListPage);
        //     // this.tabRef.select(1);
        // });

        // let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
        //     console.log('network was disconnected :-(');
        //     let toast = this.toastCtrl.create({
        //         message: 'Internet connection failed',
        //         duration: 3000,
        //         position: 'bottom',
        //         showCloseButton: true,
        //         closeButtonText: 'Close'
        //     });
        //     toast.present();
        // });
    }

    ionViewDidLoad() {
        this.updateBadge();
        this.schedule();

    }

    updateBadge(): void {
        this.notificationData.size = this.notificationService.getNotificationNumber();
    }

    schedule(): void {
        // LocalNotifications.schedule({
        //     title: "TCC Notifications",
        //     text: "You have TCC notifications. Please check it.",
        //     badge: this.notificationData.size
        // })
    }
}