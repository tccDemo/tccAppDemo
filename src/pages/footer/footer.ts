import {Component}                    from  '@angular/core';

import {HomePage}                     from '../home/home';
import {NotificationListPage}         from '../notification-list/notification-list';
import {SettingPage}                     from '../setting/setting';

import { NotificationService } from '../../providers/notification.service';

@Component({
    templateUrl: 'footer.html'
})

export class FooterPage {

    navRoot1: any = HomePage;
    navRoot2: any = NotificationListPage;
    navRoot3: any = SettingPage;
    notificationData: any = {size:0};

    constructor(private notificationService: NotificationService) {
    }

    ionViewDidLoad() {
    	this.updateBadge();
    }

    updateBadge(){
       this.notificationData.size = this.notificationService.getNotificationNumber();
    }
}