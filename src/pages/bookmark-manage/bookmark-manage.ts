import { Component } from '@angular/core';
import { NavParams, ViewController, reorderArray } from 'ionic-angular';

import { Bookmark } from '../../providers/bookmark';
import { BookmarkService } from '../../providers/bookmark.service';
import { CampusInfo } from '../../providers/campusInfo';
import { UserInfo } from '../../providers/userInfo';
import { StorageService, USER_INFO, CAMPUS_INFO, CAMPUS_DESIGN } from '../../providers/storage.service';
import { CampusDesign } from '../../providers/campusDesign';
import { UtilDialogService } from '../../providers/util/util-dialog.service';

@Component({
  selector: 'page-bookmark-manage',
  templateUrl: 'bookmark-manage.html',
})
export class BookmarkManagePage {

  bookmarks: Bookmark[];
  campusInfo: CampusInfo;
  userInfo: UserInfo;
  campusDesign: CampusDesign;

  constructor(
    private viewCtrl: ViewController,
    private navParams: NavParams,
    private utilDialogServ: UtilDialogService,
    private bookmarkService: BookmarkService,
    private storageService: StorageService) {
      this.bookmarks = navParams.get('bookmarks');      
  }

  ngOnInit(): void {
    this.campusDesign = this.storageService.get(CAMPUS_DESIGN);
  }

  reorderItems(indexes) {
    this.bookmarks = reorderArray(this.bookmarks, indexes);
    this.bookmarkService.updateSeqs(this.bookmarks);
  }

  dismiss(): void {
    this.viewCtrl.dismiss();
  }
}
