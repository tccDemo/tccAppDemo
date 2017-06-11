import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, ToastController, AlertController } from 'ionic-angular';

import { Event } from '../../providers/event';
import { EventService } from '../../providers/event.service';
import { Calendar } from '@ionic-native/calendar';
import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, CAMPUS_DESIGN } from '../../providers/storage.service';
import { UtilDialogService } from '../../providers/util/util-dialog.service';

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetailPage {

  ev: Event;
  start: Date;
  end: Date;
  campusDesign: CampusDesign;

  constructor(
    private params: NavParams,
    private navCtrl: NavController,
    private calendar: Calendar,
    private viewCtrl: ViewController,
    private utilDialogServ: UtilDialogService,
    private eventService: EventService,
    private storageService: StorageService,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) { }

  ngOnInit(): void {
    this.campusDesign = this.storageService.get(CAMPUS_DESIGN);
    this.getEvent(this.params.get('eventId'));
  }

  ionViewWillLeave() {
  }

  getEvent(eventId: string): void {
    this.eventService.getEvent(eventId)
      .then((ev: Event) => this.loadEvent(ev))
      .catch((error) => {
        this.utilDialogServ.showError(error);
      });
  }

  loadEvent(ev: Event) {
    this.ev = ev;
  }

  download(): void {
    let alert = this.alertCtrl.create({
      title: 'Confirm Message',
      message: 'Do you want to add this event to your local calendar?',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            this.calendar
              .createEvent(this.ev.title, this.ev.location, this.ev.detail, this.ev.start, this.ev.end)
              .then(() =>
                this.utilDialogServ.showSuccess('You have imported the event into your mobile calendar successfully!'))
              .catch((error) => {
                this.utilDialogServ.showError(error);
              });
          }
        }
      ]
    });
    alert.present();
  }

  dismiss() {
    this.navCtrl.pop();
  }
}
