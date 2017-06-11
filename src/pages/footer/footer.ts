import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Tabs, ToastController } from 'ionic-angular';

import { HomePage } from '../home/home';
import { CampusDesign } from '../../providers/campusDesign';
import { NotificationListPage } from '../notification-list/notification-list';
import { SettingPage } from '../setting/setting';

import { NotificationService } from '../../providers/notification.service';
import { StorageService, CAMPUS_DESIGN } from '../../providers/storage.service';
import { LocalNotifications } from 'ionic-native';
// import { Network } from '@ionic-native/network';
import { UtilDialogService } from '../../providers/util/util-dialog.service';

@Component({
    templateUrl: 'footer.html'
})

export class FooterPage {

    navRoot1: any = HomePage;
    navRoot2: any = NotificationListPage;
    navRoot3: any = SettingPage;
    notificationData: any = { size: 0 };
    campusDesign: CampusDesign;
    
    @ViewChild('mainTabs') tabs:Tabs;
    constructor(
        private notificationService: NotificationService,
        private storageService: StorageService,
        // private network: Network,
        private utilDialogServ: UtilDialogService,
        private toastCtrl: ToastController,
        private navController: NavController) {

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

    ngOnInit() {
        this.campusDesign = this.storageService.get(CAMPUS_DESIGN);
    }

    ionViewDidLoad() {
        this.updateBadge();
    }

    updateBadge(): void {
        this.notificationService.getNotificationNumber().then(count => {
            this.notificationData.size = count;
        }).catch((error) => {
            this.utilDialogServ.showError(error);
        });
    }
}