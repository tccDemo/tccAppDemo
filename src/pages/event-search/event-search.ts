import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { BundleEvents } from '../../providers/bundleEvents';
import { appToolBar } from '../../utils/appToolbar';
import { Keyboard } from 'ionic-native';

@Component({
  selector: 'page-event-search',
  templateUrl: 'event-search.html'
})
export class EventSearchPage {

  bundleEvents: BundleEvents[];
  openDetailPage: Function = null;
  initListData: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.bundleEvents = navParams.get('bundleEvents');
    this.openDetailPage = navParams.get('openDetailPage');
  }


  ngOnInit(): void {
    appToolBar.hideTabsBar();
    Keyboard.show();
  }

  ionViewWillLeave() {
    appToolBar.showTabsBar();
    Keyboard.close();
  }

  doSearch(ev): void {
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.bundleEvents.forEach(function (be) {
        be.events = be.events.filter((item) => {
          return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
        })
      });
      this.initListData = true;
    } else {
      this.doClear();
    }
  }

  doClear(): void {
    this.initListData = false;
  }
}
