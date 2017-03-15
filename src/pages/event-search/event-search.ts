import { Component, ViewChild, Renderer, ElementRef } from '@angular/core';
import { NavController, NavParams, Searchbar, ViewController } from 'ionic-angular';
import { BundleEvents } from '../../providers/bundleEvents';
import { Keyboard } from 'ionic-native';

@Component({
  selector: 'page-event-search',
  templateUrl: 'event-search.html'
})
export class EventSearchPage {

  bundleEvents: BundleEvents[];
  openDetailPage: Function = null;
  initListData: boolean = false;
  @ViewChild('searchBar') searchBarRef: Searchbar;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private renderer: Renderer,
    private elementRef: ElementRef) {
    this.bundleEvents = navParams.get('bundleEvents');
    this.openDetailPage = navParams.get('openDetailPage');
  }
  ngAfterViewInit() {

    // const element = this.elementRef.nativeElement.querySelector('ion-searchbar');
    // setTimeout(() => {
    //     this.renderer.invokeElementMethod(element, 'focus', []);
    //     Keyboard.show();
    // },500);
  }

  ngOnInit(): void {
    var self = this;    
    setTimeout(() => {
        self.searchBarRef.setFocus();
        Keyboard.show();
    },500);    
  }

  ionViewLoaded(): void {
  }

  ionViewWillLeave(): void {
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

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
