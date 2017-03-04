import {Component}                    from  '@angular/core';

import {HomePage}                     from '../home/home';
import {NotificationListPage}         from '../notification-list/notification-list';
import {SettingPage}                     from '../setting/setting';

@Component({
    templateUrl: 'footer.html'
})

export class FooterPage {

    navRoot1: any = HomePage;
    navRoot2: any = NotificationListPage;
    navRoot3: any = SettingPage;
}