import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CalendarSubscribe } from '../../providers/calendar/calendar-subscribe.interface';

import { CalendarService } from '../../providers/calendar/calendar.service';
import { UtilDialogService } from '../../providers/util/util-dialog.service';
import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, CAMPUS_DESIGN } from '../../providers/storage.service';

@Component({
  selector: 'page-calendar-subscription',
  templateUrl: 'calendar-subscription.html',
  providers: [CalendarService, UtilDialogService]
})
export class CalendarSubscriptionPage {

  private campusDesign: CampusDesign;

  private loaded: boolean = false;

  private list: CalendarSubscribe[];

  private loadList(): Promise<any> {
    this.loaded = false;

    return new Promise((reslove, reject) => {
      this.calendarServ
        .getSubscribeList()
        .then((response) => {
          this.list = response;
          this.loaded = true;

          reslove();
        })
        .catch((error) => {
          this.utilDialogServ.showError(error);
          this.loaded = true;

          reject();
        });
    });
  }

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private storageService: StorageService,
    private utilDialogServ: UtilDialogService,
    private calendarServ: CalendarService
  ) {}

  ngOnInit(): void {
    this.campusDesign = this.storageService.get(CAMPUS_DESIGN);
    this.loadList().catch(error => {});
  }

  evSave(): void {
    let calendarSubscribeList: CalendarSubscribe[] = this.list,
        loading = this.utilDialogServ.getLoading();

    loading.show();

    this.calendarServ
      .subscribe(calendarSubscribeList)
      .then(() => {
        loading.hide();

        this.navCtrl.pop();
      })
      .catch((error) => {
        loading.hide();

        this.utilDialogServ.showError(error);
      });
  }
}
