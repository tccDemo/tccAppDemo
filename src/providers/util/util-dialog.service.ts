import { Injectable } from '@angular/core';

import { ToastController, AlertController, LoadingController } from 'ionic-angular';

@Injectable()
export class UtilDialogService {
  constructor(
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private loadingCtrl: LoadingController
  ) {}

  public showSuccess(message: string): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top'
    });
    toast.present();
  }

  public showError(message: string): void {
    let toast = this.toastCtrl.create({
      message: message,
      duration: 3000,
      position: 'top',
      showCloseButton: true,
      closeButtonText: 'Close',
      cssClass: "errorLoginMsg"
    });
    toast.present();
  }

  public showConfirm(message: string, argeeCallback: () => void, cancelCallback: () => void = () => {}): void {
    let alert = this.alertCtrl.create({
      // title: 'Confirm purchase',
      message: message,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: cancelCallback
        },
        {
          text: 'OK',
          handler: argeeCallback
        }
      ]
    });
    alert.present();
  }

  public getLoading(message: string = 'Loading Please Wait...') {
    let loading = this.loadingCtrl.create({
          content: message
        });

    return {
      show: () => loading.present(),
      hide: () => loading.dismiss()
    }
  }

}