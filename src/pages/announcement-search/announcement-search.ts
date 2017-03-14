import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Announcement } from '../../providers/announcement';
import { AnnouncementService } from '../../providers/announcement.service';
import { AnnouncementDetailPage } from '../announcement-detail/announcement-detail';
import { appToolBar } from '../../utils/appToolbar';
import { Keyboard } from 'ionic-native';

@Component({
  selector: 'page-announcement-search',
  templateUrl: 'announcement-search.html'
})
export class AnnouncementSearchPage {
  public announcements: Announcement[];
  initListData: boolean = false;

  constructor(private navParams: NavParams,
    private navCtrl: NavController,
    private announcementService: AnnouncementService) {

  }

  ngOnInit(): void {
    this.getAnnouncements();
    appToolBar.hideTabsBar();
    Keyboard.show();
  }
  
  ionViewWillLeave() {
    appToolBar.showTabsBar();
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
}
