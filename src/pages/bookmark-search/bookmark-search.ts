import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Searchbar, ViewController } from 'ionic-angular';
import { Bookmark } from '../../providers/bookmark';
import { CampusInfo } from '../../providers/campusInfo';
import { Keyboard } from 'ionic-native';

@Component({
  selector: 'page-bookmark-search',
  templateUrl: 'bookmark-search.html'
})
export class BookmarkSearchPage {

  @ViewChild('searchBar') searchBarRef: Searchbar;
  totalBookmarks: Bookmark[];
  bookmarks: Bookmark[];
  isTileView: boolean = true;
  filter: string = "myFavour";
  campusInfo: CampusInfo;
  initListData: boolean = false;
  openDetailBookmark: Function = null;
  launchFromThemeableBrowser: Function = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController) {
    this.totalBookmarks = navParams.get('bookmarks');
    this.isTileView = navParams.get('isTileView');
    this.filter = navParams.get('filter');
    this.campusInfo = navParams.get('campusInfo');
    this.openDetailBookmark = navParams.get('openDetailBookmark');
    this.launchFromThemeableBrowser = navParams.get('launchFromThemeableBrowser');
  }

  ngOnInit(): void {
    var self = this;
    setTimeout(() => {
      self.searchBarRef.setFocus();
      Keyboard.show();
    }, 500);
  }

  ionViewWillLeave() {
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

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
