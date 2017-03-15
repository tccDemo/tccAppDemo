import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ViewController, Platform, ModalController } from 'ionic-angular';
import { ThemeableBrowser } from "ionic-native";

import { Bookmark } from '../../providers/bookmark';
import { BookmarkService } from '../../providers/bookmark.service';
import { CampusInfo } from '../../providers/campusInfo';
import { UserInfo } from '../../providers/userInfo';
import { StorageService, USER_INFO, CAMPUS_INFO } from '../../providers/storage.service';
import { BookmarkSearchPage } from '../bookmark-search/bookmark-search';
import { DragulaService } from 'ng2-dragula';
import { Dragula } from 'dragula';

declare var $: any;

@Component({
  selector: 'page-bookmark-list',
  templateUrl: 'bookmark-list.html'
})
export class BookmarkListPage {

  bookmarks: Bookmark[];
  isTileView: boolean = true;
  filter: string = "myFavour";
  isSortable: boolean = false;
  campusInfo: CampusInfo;
  userInfo: UserInfo;

  constructor(public plt: Platform,
    private navCtrl: NavController,
    private navParams: NavParams,
    private bookmarkService: BookmarkService,
    private dragulaService: DragulaService,
    private zone: NgZone,
    private modalCtrl: ModalController,
    private storageService: StorageService) {
  }

  private doSort(args: any): void {
    let [el, target, source] = args;
    this.bookmarkService.updateSeqs(target.children);
    this.refreshBookmarks(this.filter);
  }

  loadInfo(): void {
    this.campusInfo = this.storageService.get(CAMPUS_INFO);
    this.userInfo = this.storageService.get(USER_INFO);
  }

  ngOnInit(): void {
    this.loadInfo();
    var self = this;
    self.refreshBookmarks("myFavour");
    self.dragulaService.drop.subscribe((value: any) => {
      self.doSort(value.slice(1));
    });
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.bookmarks = [];
      this.refreshBookmarks(this.filter);
      refresher.complete();
    }, 500);
  }

  refreshBookmarks(bookmarkFilter: string): void {
    if (this.filter != bookmarkFilter) {
      this.isSortable = false;
    }

    this.filter = bookmarkFilter || this.filter;
    if (this.filter == "all") {
      this.getAllBookmarks();
    } else if (this.filter == "myFavour") {
      this.getMyFavourBookmarks();
    } else if (this.filter == "popular") {
      this.getPopularBookmarks();
    } else if (this.filter == "recent") {
      this.getRecentlyBookmarks();
    } else {
      this.filter = "myFavour";
      this.getMyFavourBookmarks();
    }
  }

  getAllBookmarks(): void {
    this.bookmarkService.getAllBookmarks().then((bookmarks: Bookmark[]) => this.bookmarks = bookmarks);
  }

  getMyFavourBookmarks(): void {
    this.bookmarkService.getMyFavourBookmarks().then((bookmarks: Bookmark[]) => this.bookmarks = bookmarks);
  }

  getPopularBookmarks(): void {
    this.bookmarkService.getPopularBookmarks().then((bookmarks: Bookmark[]) => this.bookmarks = bookmarks);
  }

  getRecentlyBookmarks(): void {
    this.bookmarkService.getRecentlyBookmarks().then((bookmarks: Bookmark[]) => this.bookmarks = bookmarks);
  }

  switchView(): void {
    this.isTileView = !this.isTileView;
  }

  openDetailBookmark(bookmarkId: number) {
    let bookmark = this.bookmarks.find(function (bookmark) { return bookmark.id == bookmarkId });
    this.launchFromThemeableBrowser(bookmark);
  }

  launchFromThemeableBrowser(bookmark: Bookmark) {
    var self = this;
    // var imageValue = bookmark.isMyFavour ? "unfavour" : "favour";

    let options: any = {
      statusbar: {
        color: '#2eb3feff'
      },
      toolbar: {
        height: 44,
        color: '#2eb3feff'
      },
      title: {
        color: '#ffffffff',
        showPageTitle: true
      },
      backButton: {
        image: 'back',
        imagePressed: 'back_pressed',
        align: 'left',
        event: 'backPressed'
      },
      forwardButton: {
        image: 'forward',
        imagePressed: 'forward_pressed',
        align: 'left',
        event: 'forwardPressed'
      },
      closeButton: {
        image: 'close',
        imagePressed: 'close_pressed',
        align: 'left',
        event: 'closePressed'
      },
      customButtons: [
        {
          image: "favour",
          imagePressed: 'press_favour',
          align: 'right',
          'event': 'markFavour'
        }
      ],

      backButtonCanClose: false
    };

    let browser: ThemeableBrowser = new ThemeableBrowser(bookmark.link, '_self', options);
    browser.on('markFavour').subscribe(
      (data) => {

        var msg = bookmark.isMyFavour ? "Do you want to remove this link from your favorite list?" : "Do you want to add this link into your favorite list?";

        if (confirm(msg)) {
          bookmark.isMyFavour = !bookmark.isMyFavour;
          self.bookmarkService.markFavour(bookmark.id, bookmark.isMyFavour);
          // options.customButtons[0].image = bookmark.isMyFavour ? "unfavour" : "favour";
          if (bookmark.isMyFavour) {
            alert("Added this link to your favorite list!");
          } else {
            alert("Removed this link from your favorite list!");
          }

          if (self.filter == "myFavour") {
            self.zone.run(() => self.refreshBookmarks(self.filter));
          }
        }
      },
      (err) => {
        console.error('onError');
      });
  }

  enableSort(): void {
    if (this.filter == 'myFavour') {
      this.isSortable = true;
    }
  }

  disableSort(): void {
    this.isSortable = false;
  }

  openSearch() {
    let modal = this.modalCtrl.create(BookmarkSearchPage, {
      bookmarks: this.bookmarks, isTileView: this.isTileView,
      filter: this.filter, campusInfo: this.campusInfo,
      openDetailBookmark: this.openDetailBookmark, launchFromThemeableBrowser: this.launchFromThemeableBrowser
    });
    modal.present();
  }  
}
