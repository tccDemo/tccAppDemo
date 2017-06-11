import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Searchbar, ViewController } from 'ionic-angular';
import { Announcement } from '../../providers/announcement';
import { AnnouncementService } from '../../providers/announcement.service';
import { AnnouncementDetailPage } from '../announcement-detail/announcement-detail';
import { Keyboard } from '@ionic-native/keyboard';
import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, CAMPUS_DESIGN } from '../../providers/storage.service';
import { UtilDialogService } from '../../providers/util/util-dialog.service';

@Component({
  selector: 'page-announcement-search',
  templateUrl: 'announcement-search.html'
})
export class AnnouncementSearchPage {

  announcements: Announcement[];
  campusDesign: CampusDesign;
  initListData: boolean = false;
  @ViewChild('searchBar') searchBarRef: Searchbar;

  constructor(private navParams: NavParams,
    private navCtrl: NavController,
    private viewCtrl: ViewController,
    private utilDialogServ: UtilDialogService,
    private storageService: StorageService,
    private keyboard: Keyboard,
    private announcementService: AnnouncementService) {

  }

  ngOnInit(): void {
    var self = this;
    this.getAnnouncements();
    setTimeout(() => {
      self.searchBarRef._fireFocus();
      this.keyboard.show();
    }, 500);

    this.campusDesign = this.storageService.get(CAMPUS_DESIGN);
  }


  ionViewDidEnter() {
  }

  ionViewDidLeave() {
    this.keyboard.close();
  }

  getAnnouncements(): void {
    this.announcementService.getAnnouncements(1, 9999)
      .then((announcements: Announcement[]) => this.announcements = announcements)
      .catch((error) => {
        this.utilDialogServ.showError(error);
      });
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
