import { Component } from '@angular/core';
import { NavParams,ViewController } from 'ionic-angular';

import { Event } from '../../providers/event';
import { EventService } from '../../providers/event.service';

import {Calendar} from 'ionic-native';
import { AlertController } from 'ionic-angular';

@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html'
})
export class EventDetailPage {

  ev:Event;
  start: Date;
  end: Date;

  constructor(
    public params: NavParams,
    public viewCtrl: ViewController,
    public eventService: EventService,
    public alertCtrl: AlertController
  	){}

  ngOnInit(): void {
    this.getEvent(this.params.get('eventId'));
  }

  getEvent(eventId: number): void {
    this.eventService.getEvent(eventId).then( (ev: Event) => this.loadEvent(ev));
  }

  loadEvent(ev: Event) {
    this.ev = ev;
    this.start = new Date(this.ev.startDate.getTime()+this.ev.startTime*1000*3600);
    this.end = new Date(this.ev.endDate.getTime()+this.ev.endTime*1000*3600);
  }

  dismiss():void {
    this.viewCtrl.dismiss();
  }

  download():void { 
    Calendar.createEvent(this.ev.title, this.ev.location, this.ev.detail, this.start, this.end).then(()=>this.showDLSucMsg());
  }

  showDLSucMsg():void{
    let alert = this.alertCtrl.create({
      title: 'Success!',
      subTitle: 'You have imported the event into your mobile calendar!',
      buttons: ['OK']
    });
    alert.present();
  }
  

}
