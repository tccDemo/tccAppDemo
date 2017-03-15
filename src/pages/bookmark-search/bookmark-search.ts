import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Bookmark } from '../../providers/bookmark';
import { appToolBar } from '../../utils/appToolbar';
import { CampusInfo } from '../../providers/campusInfo';
import { Keyboard } from 'ionic-native';

@Component({
  selector: 'page-bookmark-search',
  templateUrl: 'bookmark-search.html'
})
export class BookmarkSearchPage {

  totalBookmarks: Bookmark[];
  bookmarks: Bookmark[];
  isTileView: boolean = true;
  filter: string = "myFavour";
  campusInfo: CampusInfo;  
  initListData: boolean = false;
  openDetailBookmark: Function = null;
  launchFromThemeableBrowser: Function = null;

  constructor(public navCtrl: NavController, public navParams: NavParams) {    
     this.totalBookmarks = navParams.get('bookmarks');
     console.log(this.totalBookmarks)
     this.isTileView = navParams.get('isTileView');
     this.filter = navParams.get('filter');
     this.campusInfo = navParams.get('campusInfo');
     this.openDetailBookmark = navParams.get('openDetailBookmark');
     this.launchFromThemeableBrowser = navParams.get('launchFromThemeableBrowser');
  }

  ngOnInit(): void {
    appToolBar.hideTabsBar();
    Keyboard.show();
  }

  ionViewWillLeave() {
    appToolBar.showTabsBar();
  }

  doSearch(ev): void {
    console.log(ev.target.value)
    var val = ev.target.value;
    if (val && val.trim() != '') {
      this.bookmarks = this.totalBookmarks.filter((item) => {
        return (item.subject.toLowerCase().indexOf(val.toLowerCase()) > -1);
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