import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Bookmark } from './bookmark';
import { BOOKMARKS } from './mock-bookmark';

declare var $:any;

@Injectable()
export class BookmarkService {

  constructor(private http: Http) {}

  getAllBookmarks(): Promise<Bookmark[]> {
    return Promise.resolve(this.getSortedBookmarks());
  }

  getSortedBookmarks():Bookmark[] {
    return BOOKMARKS.sort(function(b1,b2){
      return b1.seq - b2.seq;
      });
  }

  getMyFavourBookmarks(): Promise<Bookmark[]> {
    let ret = this.getSortedBookmarks().filter(function(bookmark){return bookmark.isMyFavour});
    return Promise.resolve(ret);
  }

  getRecentlyBookmarks(): Promise<Bookmark[]> {
    let ret = this.getSortedBookmarks().filter(function(bookmark){return bookmark.isRecent});
    return Promise.resolve(ret);
  }

  getPopularBookmarks(): Promise<Bookmark[]> {
    let ret = this.getSortedBookmarks().filter(function(bookmark){return bookmark.isPopular});
    return Promise.resolve(ret);
  }

  getBookmark(id: number): Promise<Bookmark> {
    return Promise.resolve(this.getSortedBookmarks()).then(bookmarks => bookmarks.find(bookmark => bookmark.id == +id));   
  }

  updateSeq(id:number|string, seq:number):void {
    BOOKMARKS.forEach(function(bookmark){
      if (bookmark.id == id) {
        bookmark.seq = seq;
      }
    });
  }

  markFavour(id:number|string, isMyFavour:boolean):void {
    BOOKMARKS.forEach(function(bookmark){
      if (bookmark.id == id) {
        bookmark.isMyFavour = isMyFavour;
      }
    });
  }

 
}