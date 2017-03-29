import { Component } from '@angular/core';
import { NavParams, ViewController } from 'ionic-angular';

import { Event } from '../../providers/event';
import { EventService } from '../../providers/event.service';

import { Calendar } from 'ionic-native';
import { AlertController } from 'ionic-angular';
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
    public viewCtrl: ViewController,
    public eventService: EventService,
    public alertCtrl: AlertController
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
    Calendar.createEvent(this.ev.title,  this.ev.location,  this.ev.detail, this.ev.startDate, this.ev.endDate).then(() => this.showDLSucMsg());
  }

  showDLSucMsg(): void {
    let alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: 'You have imported the event into your mobile calendar!',
      buttons: ['OK']
    });
    alert.present();
  }


}
