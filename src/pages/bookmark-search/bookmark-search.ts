import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Searchbar, ViewController } from 'ionic-angular';
import { Bookmark } from '../../providers/bookmark';
import { CampusInfo } from '../../providers/campusInfo';
import { Keyboard } from '@ionic-native/keyboard';
import { IS_USING_REAL_DATA } from '../../providers/tcc.service';
import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, CAMPUS_DESIGN } from '../../providers/storage.service';
import { BookmarkService } from '../../providers/bookmark.service';
import { UtilDialogService } from '../../providers/util/util-dialog.service';

@Component({
  selector: 'page-bookmark-search',
  templateUrl: 'bookmark-search.html'
})
export class BookmarkSearchPage {

  @ViewChild('searchBar') searchBarRef: Searchbar;
  totalBookmarks: Bookmark[];
  bookmarks: Bookmark[];
  filter: string = "myFavour";
  campusInfo: CampusInfo;
  initListData: boolean = false;
  openDetailBookmark: Function = null;
  launchFromThemeableBrowser: Function = null;
  isUsingRealData: boolean = IS_USING_REAL_DATA;
  campusDesign: CampusDesign;
  searchValue: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private keyboard: Keyboard,
    private utilDialogServ: UtilDialogService,
    public storageService: StorageService,
    public bookmarkService: BookmarkService,
    public viewCtrl: ViewController) {

    this.totalBookmarks = navParams.get('bookmarks');
    this.filter = navParams.get('filter');
    this.campusInfo = navParams.get('campusInfo');
    this.openDetailBookmark = navParams.get('openDetailBookmark');
    this.launchFromThemeableBrowser = navParams.get('launchFromThemeableBrowser');
  }

  ngOnInit(): void {
    var self = this;
    setTimeout(() => {
      self.searchBarRef._fireFocus();
      this.keyboard.show();
    }, 500);
    this.campusDesign = this.storageService.get(CAMPUS_DESIGN);
  }

  ionViewDidLeave() {
    this.keyboard.close();
  }

  search(ev): void {
    this.searchValue = ev.target.value;
    this.doSearch();
  }

  doSearch(): void {
    if (this.searchValue && this.searchValue.trim() != '') {
      this.bookmarks = this.totalBookmarks.filter((item) => {
        return (item.subject.toLowerCase().indexOf(this.searchValue.toLowerCase()) > -1);
      });
      this.initListData = true;
    } else {
      this.doClear();
    }
  }

  loadSearch(bookmarks: Bookmark[]): void {
    this.totalBookmarks = bookmarks;
    this.doSearch();
  }

  getAllBookmarks(): void {
    this.bookmarkService.getAllBookmarks()
      .then((bookmarks: Bookmark[]) => this.loadSearch(bookmarks))
      .catch((error) => {
        this.utilDialogServ.showError(error);
      });
  }

  getMyFavourBookmarks(): void {
    this.bookmarkService.getMyFavourBookmarks()
      .then((bookmarks: Bookmark[]) => this.loadSearch(bookmarks))
      .catch((error) => {
        this.utilDialogServ.showError(error);
      });
  }

  getPopularBookmarks(): void {
    this.bookmarkService.getPopularBookmarks()
      .then((bookmarks: Bookmark[]) => this.loadSearch(bookmarks))
      .catch((error) => {
        this.utilDialogServ.showError(error);
      });
  }

  getRecentlyBookmarks(): void {
    this.bookmarkService.getRecentlyBookmarks()
      .then((bookmarks: Bookmark[]) => this.loadSearch(bookmarks))
      .catch((error) => {
        this.utilDialogServ.showError(error);
      });
  }

  doClear(): void {
    this.initListData = false;
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }

  doFilter(name: string): void {
    this.filter = name;
    if (this.filter == "all") {
      this.getAllBookmarks();
    } else if (this.filter == "myFavour") {
      this.getMyFavourBookmarks();
    } else if (this.filter == "popular") {
      this.getPopularBookmarks();
    } else if (this.filter == "recent") {
      this.getRecentlyBookmarks();
    }
  }
}
