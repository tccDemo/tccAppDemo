import { Component } from '@angular/core';
import { NavController, NavParams, ViewController,ToastController } from 'ionic-angular';

import { Event } from '../../providers/event';
import { EventService } from '../../providers/event.service';
import { Calendar } from 'ionic-native';
import { appToolBar } from '../../utils/appToolbar';

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetailPage {

  ev: Event;
  start: Date;
  end: Date;

  constructor(
    public params: NavParams,
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public eventService: EventService,
    public toastCtrl: ToastController
  ) { }

  ngOnInit(): void {
    this.getEvent(this.params.get('eventId'));
    appToolBar.hideTabsBar();
  }

  ionViewWillLeave() {
    appToolBar.showTabsBar();
  }

  getEvent(eventId: number): void {
    this.eventService.getEvent(eventId).then((ev: Event) => this.loadEvent(ev));
  }

  loadEvent(ev: Event) {
    this.ev = ev;
  }

  download(): void {
    Calendar.createEvent(this.ev.title,  this.ev.location,  this.ev.detail, this.ev.start, this.ev.end).then(() => this.showDLSucMsg());
  }

  showDLSucMsg(): void {
    let toast = this.toastCtrl.create({
      message: 'You have imported the event into your mobile calendar successfully!',
      duration: 3000
    });
    toast.present();    
  }

  dismiss() {
    this.navCtrl.pop();
  }
}
