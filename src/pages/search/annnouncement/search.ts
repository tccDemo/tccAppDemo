import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {Announcement} from '../../../providers/announcement';
import {AnnouncementService} from '../../../providers/announcement.service';
import {AnnouncementDetailPage} from '../../announcement-detail/announcement-detail';

@Component({
  selector: 'page-search-announcement',
  templateUrl: 'search.html'
})
export class announcementSearchPage {
  public announcements: Announcement[];
  initListData: boolean = false;
  constructor(private navParams: NavParams,
              private navCtrl: NavController,
              private announcementService: AnnouncementService) {

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  ngOnInit(): void {
    this.getAnnouncements();
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
      this.initListData = true
    } else {
      this.getAnnouncements();
    }
  }
  doClear(): void {
    this.initListData = false;
  }

  openDetailPage(announcementId: string | number): void {
    this.navCtrl.push(AnnouncementDetailPage, announcementId);
  }
}
