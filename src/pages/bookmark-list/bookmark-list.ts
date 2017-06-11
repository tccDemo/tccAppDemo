import { Component, NgZone } from '@angular/core';
import { NavController, NavParams, ViewController, Platform, ModalController, AlertController } from 'ionic-angular';
import { ThemeableBrowser, ThemeableBrowserOptions, ThemeableBrowserObject } from '@ionic-native/themeable-browser';

import { Bookmark } from '../../providers/bookmark';
import { BookmarkService } from '../../providers/bookmark.service';
import { CampusInfo } from '../../providers/campusInfo';
import { UserInfo } from '../../providers/userInfo';
import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, USER_INFO, CAMPUS_INFO, CAMPUS_DESIGN } from '../../providers/storage.service';
import { BookmarkSearchPage } from '../bookmark-search/bookmark-search';
import { BookmarkManagePage } from '../bookmark-manage/bookmark-manage';
import { IS_USING_REAL_DATA } from '../../providers/tcc.service';
import { UtilDialogService } from '../../providers/util/util-dialog.service';
import { ImgCacheService } from '../../providers/imgCache/imgCache.service';

@Component({
  selector: 'page-bookmark-list',
  templateUrl: 'bookmark-list.html',
  providers: [UtilDialogService, ThemeableBrowser]
})
export class BookmarkListPage {

  bookmarks: Bookmark[];
  isTileView: boolean = true;
  filter: string = "myFavour";
  isSortable: boolean = false;
  campusInfo: CampusInfo;
  campusDesign: CampusDesign;
  userInfo: UserInfo;
  isUsingRealData: boolean = IS_USING_REAL_DATA;
  browser: ThemeableBrowserObject = null;

  constructor(public plt: Platform,
    private utilDialogServ: UtilDialogService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private navParams: NavParams,
    private imgcacheService: ImgCacheService,
    private bookmarkService: BookmarkService,
    private zone: NgZone,
    private themeableBrowser: ThemeableBrowser,
    private modalCtrl: ModalController,
    private utilDialogService: UtilDialogService,
    private storageService: StorageService) {
  }

  loadInfo(): void {
    this.campusInfo = this.storageService.get(CAMPUS_INFO);
    this.campusDesign = this.storageService.get(CAMPUS_DESIGN);
    this.userInfo = this.storageService.get(USER_INFO);
    let isTileView = this.storageService.get("BOOKMARK_VIEW_MODE");
    if (isTileView != null) {
      this.isTileView = isTileView;
    }
  }

  ngOnInit(): void {
    // this.imgcacheService.initImgCache().then(() => {
    //   console.log("imgCache service init")
    this.loadInfo();
    this.refreshBookmarks("myFavour");
    // }).catch((error) => {
    //   this.utilDialogServ.showError(error);
    // });
  }

  doRefresh(refresher) {
    setTimeout(() => {
      this.bookmarks = null;
      this.refreshBookmarks(this.filter);
      refresher.complete();
    }, 500);
  }

  refreshBookmarks(bookmarkFilter: string): void {
    this.bookmarks = null;

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
    this.bookmarkService.getAllBookmarks()
      .then((bookmarks: Bookmark[]) => this.bookmarks = bookmarks)
      .catch((error) => {
        this.utilDialogServ.showError(error);
      });
  }

  getMyFavourBookmarks(): void {
    this.bookmarkService.getMyFavourBookmarks()
      .then((bookmarks: Bookmark[]) => this.bookmarks = bookmarks)
      .catch((error) => {
        this.utilDialogServ.showError(error);
      });
  }

  getPopularBookmarks(): void {
    this.bookmarkService.getPopularBookmarks()
      .then((bookmarks: Bookmark[]) => this.bookmarks = bookmarks)
      .catch((error) => {
        this.utilDialogServ.showError(error);
      });
  }

  getRecentlyBookmarks(): void {
    this.bookmarkService.getRecentlyBookmarks()
      .then((bookmarks: Bookmark[]) => this.bookmarks = bookmarks)
      .catch((error) => {
        this.utilDialogServ.showError(error);
      });
  }

  switchView(): void {
    this.isTileView = !this.isTileView;
    this.storageService.set("BOOKMARK_VIEW_MODE", this.isTileView);
  }

  openDetailBookmark(bookmarkId: number | string) {
    let bookmark = this.bookmarks.find(function (bookmark) { return bookmark.id == bookmarkId });
    this.launchFromThemeableBrowser(bookmark);
  }

  getSkinColor() {
    var ret = "#2eb3feff";
    switch (this.campusDesign.header.color) {
      case 'black':
        ret = "#323232";
        break;
      case 'green':
        ret = "#5dc38b";
        break;
      case 'orange':
        ret = "#f18f04";
        break;
      case 'purple':
        ret = "#a082d1";
        break;
    }
    return ret;
  }

  launchFromThemeableBrowser(bookmark: Bookmark) {
    var self = this;
    var favImage = bookmark.isMyFavour ? "favour" : "unfavour";
    let color = this.getSkinColor();
    let options: ThemeableBrowserOptions = {
      statusbar: {
        color: color
      },
      toolbar: {
        height: 44,
        color: color
      },
      title: {
        color: '#003264ff',
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
          image: `${favImage}`,
          imagePressed: 'press_favour',
          align: 'right',
          'event': 'markFavour'
        }
      ],
      backButtonCanClose: false
    };

    this.newBrowser(bookmark, options);

  }

  private newBrowser(bookmark: Bookmark, options: ThemeableBrowserOptions): void {
    var self = this;
    this.browser = this.themeableBrowser.create(bookmark.link, 'newxxx', options);
    this.browser.on('markFavour').subscribe(
      (data) => {
        console.log(JSON.stringify(data))
        var msg = bookmark.isMyFavour ?
          "Do you want to remove this link from your favorite campus links?" :
          'Do you want to add this link to your favorite campus links?';

        if (confirm(msg)) {
          bookmark.isMyFavour = !bookmark.isMyFavour;
          self.bookmarkService.markFavour(bookmark.id, bookmark.isMyFavour);
          options.customButtons[0]["image"] = bookmark.isMyFavour ? "favour" : "unfavour";
          if (bookmark.isMyFavour) {
            alert("Added this link to your favorite list!");
          } else {
            alert("Removed this link from your favorite list!");
          }
          console.log(JSON.stringify(self.browser));

          // self.newBrowser(bookmark, options);          


          self.zone.run(() => {
            console.log("zone refresh")
            self.refreshBookmarks(self.filter)
          });


        }
      },
      (err) => {
        console.error('onError');
      });
  }

  openManagePage(): void {
    if (this.filter === 'myFavour') {
      let modal = this.modalCtrl.create(BookmarkManagePage, {
         bookmarks: this.bookmarks
      });
      modal.present();
    }
  }

  markFavour(bookmark: Bookmark): void {
    var isMyFavour = !bookmark.isMyFavour;
    let alert = this.alertCtrl.create({
      title: 'Confirm Message',
      message: isMyFavour ?
        'Do you want to add this link to your favorite campus links?' :
        "Do you want to remove this link from your favorite campus links?",
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: () => {
            bookmark.isMyFavour = isMyFavour;
            this.bookmarkService.markFavour(bookmark.id, bookmark.isMyFavour).then(() => {
              this.utilDialogService.showSuccess("'" + bookmark.subject +
                (bookmark.isMyFavour ? "' was added to my favorite campus links successfully!" :
                  "' was removed from my favorite campus links successfully!"));
            }).catch((error) => {
              this.utilDialogServ.showError(error);
            });
          }
        }
      ]
    });
    alert.present();
  }

  go2AllLinks(): void {
    this.filter = "all";
    this.refreshBookmarks(this.filter);
  }

  openSearch() {
    let modal = this.modalCtrl.create(BookmarkSearchPage, {
      bookmarks: this.bookmarks,
      filter: this.filter, campusInfo: this.campusInfo,
      openDetailBookmark: this.openDetailBookmark, launchFromThemeableBrowser: this.launchFromThemeableBrowser
    });
    modal.present();
  }


  swipeEvent(event) {
    console.log("Swipe from bookmark-list.ts");
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
