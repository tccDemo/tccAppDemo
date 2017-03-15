import {Component, ViewChild, OnInit} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

import {UserAvatarComponent} from '../../components/user-avatar/user-avatar';

import { UserInfo } from '../../providers/userInfo';
import { StorageService, USER_INFO } from '../../providers/storage.service';

@Component({
    selector: 'page-setting',
    templateUrl: 'setting.html'
})
export class SettingPage {
    
    userInfo: UserInfo = null;

    @ViewChild(UserAvatarComponent)
    userAvatar: UserAvatarComponent;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public storageService: StorageService) {
    }

    ngOnInit(): void {
        this.userInfo = this.storageService.get(USER_INFO);
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad SettingPage');
    }

}
