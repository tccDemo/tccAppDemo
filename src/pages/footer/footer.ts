import {Component}                    from  '@angular/core';

import {HomePage}                     from '../home/home';
import {NotificationListPage}         from '../notification-list/notification-list';
import {SettingPage}                     from '../setting/setting';

@Component({
    templateUrl: 'footer.html'
})

export class FooterPage {
    // this tells the tabs component which Pages
    // should be each tab's root Page
    navRoot1: any = HomePage;
    navRoot2: any = NotificationListPage;
    navRoot3: any = SettingPage;

    constructor() {

    }
}