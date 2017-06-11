import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, InfiniteScroll } from 'ionic-angular';

import { Announcement } from '../../providers/announcement';
import { AnnouncementService } from '../../providers/announcement.service';
import { CampusInfo } from '../../providers/campusInfo';
import { UserInfo } from '../../providers/userInfo';

import { AnnouncementDetailPage } from '../announcement-detail/announcement-detail';
import { AnnouncementSearchPage } from '../announcement-search/announcement-search';
import { UtilDialogService } from '../../providers/util/util-dialog.service';

@Component({
  selector: 'page-announcement-list',
  templateUrl: 'announcement-list.html'
})
export class AnnouncementListPage {

  announcements: Announcement[];
  totalCount: Number = -1;

  constructor(private navParams: NavParams,
    private navCtrl: NavController,
    private utilDialogServ: UtilDialogService,
    private modalCtrl: ModalController,
    private announcementService: AnnouncementService) {
  }

  ngOnInit(): void {
    this.getAnnouncements();
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.announcements = null;
      this.getAnnouncements();
      refresher.complete();
    }, 500);
  }

  // doInfinite(infiniteScroll: any) {
  //   console.log('Begin infinite operation');

  //   setTimeout(() => {
  //     this.getAnnouncements(infiniteScroll);

  //     console.log('Async operation has ended');
  //     infiniteScroll.complete();
  //   }, 500);
  // }

  getAnnouncements(infiniteScroll?: any): void {
    var length = 0;
    if (this.announcements != null) {
      length = this.announcements.length;
    }
    this.announcementService.getAnnouncements(length + 1).then(
      (announcements: Announcement[]) => {
        this.loadData(announcements);
        // if (infiniteScroll && (announcements == null || announcements.length == 0)) {
        //   infiniteScroll.enable(false);
          this.totalCount = this.announcements != null ? this.announcements.length : 0;
        // }
      }).catch((error) => {
        this.utilDialogServ.showError(error);
      });
  }

  loadData(announcements: Announcement[]): void {
    if (this.announcements == null) {
      this.announcements = new Array<Announcement>();
    }
    if (announcements != null && announcements.length > 0) {
      for (let i = 0; i < announcements.length; i++) {
        this.announcements.push(announcements[i]);
      }
    }

  }

  openDetailPage(announcementId: string | number): void {
    this.navCtrl.push(AnnouncementDetailPage, announcementId);
  }

  openSearch() {
    let modal = this.modalCtrl.create(AnnouncementSearchPage);
    modal.present();
  }

  swipeEvent(event) {
    console.log("Swipe from announcement.ts");
    //swipe left
    if (event.direction == 2) {
      console.log("Swipe to right");
    }
    //swipe right
    if (event.direction == 4) {
      console.log("Swipe to left");
    }
  }
  
}
