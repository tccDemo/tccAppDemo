import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Network } from '@ionic-native/network';
import { Platform, ToastController } from 'ionic-angular';

@Injectable()
export class NetWorkChecker {
    public online: boolean = true;
    public base: string; // this will be set in the constructor based on if we're in dev or prod
    public token: string = null;

    constructor(
        private platform: Platform,
        private toastCtrl: ToastController,
        private network: Network) {


        this.platform.ready().then(() => {
            let type = this.network.type;

            //console.log("Connection type: ", this.network.type);
            // Try and find out the current online status of the device
            if (type == "unknown" || type == "none" || type == undefined) {
                //console.log("The device is not online");
                this.online = false;
            } else {
                //console.log("The device is online!");
                this.online = true;
            }
        });

        this.network.onDisconnect().subscribe(() => {
            this.online = false;
            console.log("Network was disconnected");
            this.toastCtrl.create({
                message: 'Internet connection failed, please check your internet setting',
                duration: 2000,
                position: 'top'
            }).present();
        });

        this.network.onConnect().subscribe(() => {
            this.online = true;
            console.log("Network was connected");
            this.toastCtrl.create({
                message: 'Internet was connected again',
                duration: 2000,
                position: 'top'
            }).present();
        });
    }
}