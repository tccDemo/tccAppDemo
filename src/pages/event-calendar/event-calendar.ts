import { Component, ChangeDetectionStrategy } from '@angular/core';
import { NavController, NavParams, ModalController, ViewController } from 'ionic-angular';

import { Event } from '../../providers/event';
import { EventService } from '../../providers/event.service';

import { EventDetailPage } from '../event-detail/event-detail';
import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, CAMPUS_DESIGN } from '../../providers/storage.service';

@Component({
    selector: 'page-event-calendar',
    templateUrl: 'event-calendar.html'
})
export class EventCalendarPage {

    eventSource;
    viewTitle: string = "Calendar Events";
    isToday: boolean;
    campusDesign: CampusDesign;

    calendar = {
        mode: 'month',
        currentDate: new Date()
    };

    constructor(private navController: NavController,
        private eventService: EventService,
        private modalCtrl: ModalController,
        private storageService: StorageService,
        private viewCtrl: ViewController) { }


    onViewTitleChanged(title) {
        this.viewTitle = title;
    }

    ngOnInit(): void {
        this.campusDesign = this.storageService.get(CAMPUS_DESIGN);
        this.loadEvents();
    }

    onEventSelected(event) {
        this.navController.push(EventDetailPage, { eventId: event.id });
        // this.openDetailModal(event.id);
    }

    changeMode(mode) {
        this.calendar.mode = mode;
    }

    today() {
        this.calendar.currentDate = new Date();
    }

    onTimeSelected(ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
    }

    jumpMonth(m) {
        var current = this.calendar.currentDate;        
        var year = current.getFullYear();
        var month = current.getMonth();
        var date = current.getDate();
        month += m;
        if (month === -1) {
            year--;
            month = 11;
        } else if (month === 12) {
            year++;
            month = 0;
        }
        try {
            this.calendar.currentDate = new Date(year, month, date);
        } catch(e) {
            date = 0;
            this.calendar.currentDate = new Date(year, month, date);
        }
        
    }

    onCurrentDateChanged(event: Date) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    }

    loadEvents(): void {
        this.eventService.getEvents().then((events: Event[]) => this.loadCalEvents(events));
    }

    loadCalEvents(events: Event[]): void {
        var self = this;
        this.eventSource = new Array();
        events.forEach(function (ev) {
            self.eventSource.push({
                id: ev.id,
                title: ev.title,
                startTime: ev.start,
                endTime: ev.end,
                allDay: ev.allDay
            });
        });
    }

    onRangeChanged(ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    }

    openDetailModal(eventId: string | number): void {
        let modal = this.modalCtrl.create(EventDetailPage, eventId);
        modal.present();
    }

    dismiss(): void {
        this.viewCtrl.dismiss();
    }

    // markDisabled = (date:Date) => {
    //     var current = new Date();
    //     current.setHours(0, 0, 0);
    //     return date < current;
    // };
}
