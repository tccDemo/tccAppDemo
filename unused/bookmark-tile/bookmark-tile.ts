import { Component } from '@angular/core';
import { App, ViewController, NavController, NavParams, ModalController } from 'ionic-angular';

import { Bookmark } from '../../providers/bookmark';
import { BookmarkService } from '../../providers/bookmark.service';

import { BookmarkDetailPage } from '../bookmark-detail/bookmark-detail';
import { BookmarkListPage } from '../bookmark-list/bookmark-list';

@Component({
  selector: 'page-bookmark-tile',
  templateUrl: 'bookmark-tile.html'
})
export class BookmarkTilePage {

  bookmarks: Bookmark[];
  isTileView: true;

  constructor(private navCtrl: NavController, private navParams: NavParams, 
  	private bookmarkService: BookmarkService, private modalCtrl: ModalController,
  	      public viewCtrl: ViewController,
      public appCtrl: App){}

  ionViewDidLoad() {
  }

  
  ngOnInit(): void {
    this.getAllBookmarks();
  }

  refreshBookmarks(bookmarkFilter:string): void {
  	console.log("refreshBookmarks: "+ bookmarkFilter);
  	if (bookmarkFilter == "all") {
  		this.getAllBookmarks();
  	} else if (bookmarkFilter == "myFavour") {
  		this.getMyFavourBookmarks();
  	} else if (bookmarkFilter == "popular") {
  		this.getPopularBookmarks();
  	} else if (bookmarkFilter == "recent") {
  		this.getRecentlyBookmarks();
  	} else {
  		this.getMyFavourBookmarks();
  	}
  }

  getAllBookmarks(): void {
    this.bookmarkService.getAllBookmarks().then( (bookmarks:Bookmark[]) => this.bookmarks = bookmarks);
  }

  getMyFavourBookmarks(): void {
    this.bookmarkService.getMyFavourBookmarks().then( (bookmarks:Bookmark[]) => this.bookmarks = bookmarks);
  }

  getPopularBookmarks(): void {
    this.bookmarkService.getPopularBookmarks().then( (bookmarks:Bookmark[]) => this.bookmarks = bookmarks);
  }

  getRecentlyBookmarks(): void {
    this.bookmarkService.getRecentlyBookmarks().then( (bookmarks:Bookmark[]) => this.bookmarks = bookmarks);
  }

  openDetailModal(bookmarkId: string | number):void {
    let modal = this.modalCtrl.create(BookmarkDetailPage, bookmarkId);
    modal.present();
  }

  switchView():void{
  	// this.navCtrl.push(BookmarkListPage, { bookmarks: this.bookmarks}); 
  	  this.viewCtrl.dismiss();
      this.appCtrl.getRootNav().push(BookmarkListPage);
  }
}
