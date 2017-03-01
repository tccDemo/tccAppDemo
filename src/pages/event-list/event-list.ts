import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { Event } from '../../providers/event';
import { BundleEvents } from '../../providers/bundleEvents';
import { EventService } from '../../providers/event.service';

import { EventDetailPage } from '../event-detail/event-detail';
import { EventCalendarPage } from '../event-calendar/event-calendar';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html'
})
export class EventListPage {
   
  bundleEvents: BundleEvents[];

  constructor(private navCtrl: NavController, private navParams: NavParams, 
  	private eventService: EventService, private modalCtrl: ModalController){}

  ionViewDidLoad() {
  }
  
  ngOnInit(): void {
    this.getEvents();
  }

  doRefresh(refresher) {
    console.log('Begin async operation', refresher);    
    setTimeout(() => {
      this.bundleEvents = [];
      this.getEvents();
      console.log('Async operation has ended');
      refresher.complete();
    }, 500);
  }  

  getEvents(): void {
    this.eventService.getEvents().then( (events:Event[]) => this.orderEvents(events));
  }

  doSearch(ev): void {
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.bundleEvents.forEach(function(be){
      		be.events = be.events.filter((item) => {
        		return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      		})
      	});     
    } else {
      this.getEvents();
    }
  }

  orderEvents(events: Event[]): void {
  	var self = this;
  	this.bundleEvents = new Array();
    events.sort(function(e1,e2){
    		if (e1.startDate.getTime() != e2.startDate.getTime()) {
    			return e1.startDate.getTime() - e2.startDate.getTime();
    		}
    		return e1.startTime - e2.startTime;
    }).forEach(function(ev){

      ev.start = new Date(ev.startDate.getTime()+ev.startTime*1000*3600);
      ev.end = new Date(ev.endDate.getTime()+ev.endTime*1000*3600);

    	if (self.bundleEvents.length == 0 ||
    	  self.bundleEvents[self.bundleEvents.length-1].date.getTime()<ev.startDate.getTime()) {
    		let be = new BundleEvents();
    		be.date = ev.startDate;
    		be.events = new Array();
    		be.events.push(ev);
    		self.bundleEvents.push(be);
    	} else {
  			self.bundleEvents[self.bundleEvents.length-1].events.push(ev);    		
    	}
  	});
  	console.log(events);
  	console.log(this.bundleEvents);
  }

  openDetailModal(eventId: string | number):void {
    let modal = this.modalCtrl.create(EventDetailPage, eventId);
    modal.present();
  }

  openCalendarModal():void{
    let modal = this.modalCtrl.create(EventCalendarPage);
    modal.present();
  }
}