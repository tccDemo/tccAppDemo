import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {UserAvatarComponent} from '../../components/user-avatar/user-avatar';

/*
 Generated class for the Setting page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-setting',
    templateUrl: 'setting.html'
})
export class SettingPage {
    @ViewChild(UserAvatarComponent)
    userAvatar: UserAvatarComponent;

    constructor(public navCtrl: NavController,
                public navParams: NavParams) {
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingPage');
    }

}
