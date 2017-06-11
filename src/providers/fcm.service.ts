import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Device } from '@ionic-native/device';
import 'rxjs/add/operator/toPromise';

import { Event } from './event';
import { EVENTS } from './event-mock';

import { CampusInfo } from './campusInfo';
import { ResourceService } from './resource/resource.service';
import { UtilLogService } from './util/util-log.service';
import { AuthService } from './auth/auth.service';
import { StorageService, CAMPUS_INFO } from './storage.service';
import { FCM } from '@ionic-native/fcm';

const FCM_TOKEN: string = "FCM_TOKEN";

@Injectable()
export class FCMService {

    private getResourceUrl(): string {
        let campusInfo: CampusInfo = this.storageServ.get(CAMPUS_INFO);
        return `tcc_app/22.${campusInfo.campusId}/`;
    }

    constructor(
        private device: Device,
        private resourceServ: ResourceService,
        private storageServ: StorageService,
        private utilLogService: UtilLogService,
        private authServ: AuthService,
        private fcm: FCM
    ) { }

    setupNotifications() {

        this.fcm.getToken().then(
            (token) => {
                this.utilLogService.log("Get FCM token: " + token, undefined, 'Login', 'setupNotifications.getToken');
                this.storageServ.set(FCM_TOKEN, token);
            })
            .catch((err) => {
                this.utilLogService.warn("Error get FCM token: " + err, undefined, 'Login', 'setupNotifications.getToken');
            });

        this.fcm.onTokenRefresh().subscribe(
            (token) => {
                this.utilLogService.log("Refresh FCM token: " + token, undefined, 'Login', 'setupNotifications.onTokenRefresh');
                this.storageServ.set(FCM_TOKEN, token);
                if (this.authServ.isAuth()) {
                    this.saveUserDeviceInfo();
                }
            },
            (err) => {
                this.utilLogService.warn("Error refresh FCM token: " + err, undefined, 'Login', 'setupNotifications.onTokenRefresh');
            });

        this.fcm.onNotification().subscribe(
            (data) => {
                if (data.wasTapped) {
                    //Notification was received on device tray and tapped by the user. 
                    alert("onNotification Tapped:" + JSON.stringify(data));
                } else {
                    //Notification was received in foreground. Maybe the user needs to be notified. 
                    alert("onNotification Untapped:" + JSON.stringify(data));
                }
            }
        );
    }

    saveUserDeviceInfo(): Promise<any> {
        let url = `${this.getResourceUrl()}UserDevice`;

        let deviceInfo = {
            uuid: this.device.uuid,
            fcmToken: this.storageServ.get(FCM_TOKEN),
            platform: this.device.platform,
            version: this.device.version,
            manufacturer: this.device.manufacturer
        };

        return new Promise((reslove, reject) => {

            this.resourceServ
                .postWithAuthentication(url, {
                    uuid: deviceInfo.uuid,
                    fcmToken: deviceInfo.fcmToken,
                    platform: deviceInfo.platform,
                    version: deviceInfo.version,
                    manufacturer: deviceInfo.manufacturer
                })
                .then((response) => {
                    this.utilLogService.log(`Post resource "${url}" success`, { deviceInfo: deviceInfo }, 'FCMService', 'saveUserDeviceInfo');
                    reslove(response);
                })
                .catch((error) => {
                    this.utilLogService.warn(`Unable to post resource, url: "${url}"`, { deviceInfo: deviceInfo }, 'FCMService', 'saveUserDeviceInfo');
                    reject('Unable to save user device');
                });
        });
    }
}
