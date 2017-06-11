import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, App } from 'ionic-angular';

import { Event } from '../../providers/event';
import { BundleEvents } from '../../providers/bundleEvents';
import { EventService } from '../../providers/event.service';

import { EventDetailPage } from '../event-detail/event-detail';
import { EventCalendarPage } from '../event-calendar/event-calendar';
import { EventSearchPage } from '../event-search/event-search';
import { NotificationListPage } from '../notification-list/notification-list'
import { UtilDialogService } from '../../providers/util/util-dialog.service';

@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html'
})
export class EventListPage {

  bundleEvents: BundleEvents[];
  totalCount: number = 0;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private utilDialogServ: UtilDialogService,
    private eventService: EventService,
    private modalCtrl: ModalController,
    private app: App) { }

  ionViewDidLoad() {
  }

  ngOnInit(): void {
    this.getEvents();
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.bundleEvents = null;
      this.getEvents();
      refresher.complete();
    }, 500);
  }

  getEvents(): void {
    this.eventService.getEvents()
      .then((events: Event[]) => this.orderEvents(events))
      .catch((error) => {
        this.utilDialogServ.showError(error);
      });
  }

  orderEvents(events: Event[]): void {
    var self = this;
    this.bundleEvents = new Array();
    this.totalCount = events.length;
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

  swipeEvent(event) {
    console.log("Swipe from event.ts");
    //swipe left
    if (event.direction == 2) {
      console.log("Swipe to right");
      // this.app.getRootNav().push(NotificationListPage);
    }
    //swipe right
    if (event.direction == 4) {
      console.log("Swipe to left");
    }
  }
}