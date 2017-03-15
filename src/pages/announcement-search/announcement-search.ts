import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Searchbar, ViewController } from 'ionic-angular';
import { Announcement } from '../../providers/announcement';
import { AnnouncementService } from '../../providers/announcement.service';
import { AnnouncementDetailPage } from '../announcement-detail/announcement-detail';
import { Keyboard } from 'ionic-native';

@Component({
  selector: 'page-announcement-search',
  templateUrl: 'announcement-search.html'
})
export class AnnouncementSearchPage {
  public announcements: Announcement[];
  initListData: boolean = false;
  @ViewChild('searchBar') searchBarRef: Searchbar;

  constructor(private navParams: NavParams,
    private navCtrl: NavController,
    private viewCtrl: ViewController,
    private announcementService: AnnouncementService) {

  }

  ngOnInit(): void {
    var self = this;
    this.getAnnouncements();
    setTimeout(() => {
      self.searchBarRef.setFocus();
      Keyboard.show();
    }, 500);
  }


  ionViewDidEnter() {
  }

  ionViewWillLeave() {
  }

  getAnnouncements(): void {
    this.announcementService.getAnnouncements().then((announcements: Announcement[]) => this.announcements = announcements);
  }

  doSearch(ev): void {
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.announcements = this.announcements.filter((item) => {
        return (item.title.toLowerCase().indexOf(val.toLowerCase()) > -1);
      })
      this.initListData = true;
    } else {
      this.doClear();
    }
  }

  doClear(): void {
    this.initListData = false;
  }

  openDetailPage(announcementId: string | number): void {
    this.navCtrl.push(AnnouncementDetailPage, announcementId);
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
