import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { Event } from '../../providers/event';
import { BundleEvents } from '../../providers/bundleEvents';
import { EventService } from '../../providers/event.service';

import { EventDetailPage } from '../event-detail/event-detail';
import { EventCalendarPage } from '../event-calendar/event-calendar';
import { EventSearchPage } from '../event-search/event-search';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html'
})
export class EventListPage {

  bundleEvents: BundleEvents[];

  constructor(private navCtrl: NavController, private navParams: NavParams,
    private eventService: EventService, private modalCtrl: ModalController) { }

  ionViewDidLoad() {
  }

  ngOnInit(): void {
    this.getEvents();
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.bundleEvents = [];
      this.getEvents();
      refresher.complete();
    }, 500);
  }

  getEvents(): void {
    this.eventService.getEvents().then((events: Event[]) => this.orderEvents(events));
  }

  orderEvents(events: Event[]): void {
    var self = this;
    this.bundleEvents = new Array();
    events.sort(function (e1, e2) {
       return e1.start.getTime() - e2.start.getTime();
    }).forEach(function (ev) {
      if (self.bundleEvents.length == 0 ||
        self.bundleEvents[self.bundleEvents.length - 1].date.getTime() < ev.start.getTime()) {
        let be = new BundleEvents();
        be.date = ev.start;
        be.events = new Array();
        be.events.push(ev);
        self.bundleEvents.push(be);
      } else {
        self.bundleEvents[self.bundleEvents.length - 1].events.push(ev);
      }
    });
  }

  openDetailPage(eventId: string | number): void {
    this.navCtrl.push(EventDetailPage, eventId);
  }

  openCalendarPage(): void {
    this.navCtrl.push(EventCalendarPage);
  }

  openSearch() {
    // this.navCtrl.push(EventSearchPage, {bundleEvents: this.bundleEvents, openDetailPage: this.openDetailPage});
    let modal = this.modalCtrl.create(EventSearchPage, { bundleEvents: this.bundleEvents, openDetailPage: this.openDetailPage });
    modal.present();
  }
}