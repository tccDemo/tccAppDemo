import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Bookmark } from './bookmark';
import { BOOKMARKS } from './bookmark-mock';
import { BASE_URL, REQUEST_OPTIONS, IS_USING_REAL_DATA, handleError, TCCData } from './tcc.service';

@Injectable()
export class BookmarkService {

  private cx: string;
  private token: string;

  constructor(
    private http: Http,
    private tccData: TCCData,
  ) {
    this.cx = "22." + this.tccData.getCampusId();
    this.token = this.tccData.getToken();
  }

  getAllBookmarks(): Promise<Bookmark[]> {
    if (IS_USING_REAL_DATA) {
      let url = `${BASE_URL}&cmd=getAllCampusLinks&cx=${this.cx}&token=${this.token}`;
      return this.http.get(url).toPromise().then(res => res.json())
        .catch(err => handleError(err));
    } else {
      return Promise.resolve(this.getSortedBookmarks());
    }
  }

  getSortedBookmarks(): Bookmark[] {
    return BOOKMARKS.sort(function (b1, b2) {
      return b1.seq - b2.seq;
    });
  }

  getMyFavourBookmarks(): Promise<Bookmark[]> {
    if (IS_USING_REAL_DATA) {
      let url = `${BASE_URL}&cmd=getMyFavCampusLinks&cx=${this.cx}&token=${this.token}`;
      return this.http.get(url).toPromise().then(res => res.json())
        .catch(err => handleError(err));
    } else {
      let ret = this.getSortedBookmarks().filter(function (bookmark) { return bookmark.isMyFavour });
      return Promise.resolve(ret);
    }
  }

  getRecentlyBookmarks(): Promise<Bookmark[]> {
    if (IS_USING_REAL_DATA) {
      let url = `${BASE_URL}&cmd=getRecentCampusLinks&cx=${this.cx}&token=${this.token}`;
      return this.http.get(url).toPromise().then(res => res.json())
        .catch(err => handleError(err));
    } else {
      let ret = this.getSortedBookmarks().filter(function (bookmark) { return bookmark.isRecent });
      return Promise.resolve(ret);
    }
  }

  getPopularBookmarks(): Promise<Bookmark[]> {
    if (IS_USING_REAL_DATA) {
      let url = `${BASE_URL}&cmd=getPopularCampusLinks&cx=${this.cx}&token=${this.token}`;
      return this.http.get(url).toPromise().then(res => res.json())
        .catch(err => handleError(err));
    } else {
      let ret = this.getSortedBookmarks().filter(function (bookmark) { return bookmark.isPopular });
      return Promise.resolve(ret);
    }
  }

  getBookmark(id: number): Promise<Bookmark> {
    return Promise.resolve(this.getSortedBookmarks()).then(bookmarks => bookmarks.find(bookmark => bookmark.id == +id));
  }

  updateSeqs(bookmarks: any): void {
    if (IS_USING_REAL_DATA) {
      var ids = "";
      bookmarks.forEach(function (bookmark) {
        if (ids != "") {
          ids += ",";
        }
        ids += bookmark.bookmarkId;
      });
      let url = `${BASE_URL}&cmd=reorderMyFavCampusLinks&cx=${this.cx}&token=${this.token}&ids=${ids}`;
      this.http.post(url, REQUEST_OPTIONS).toPromise().then(res => res.json())
        .catch(err => handleError(err));
    } else {
      var seq = 0;
      for (var i = 0; i < bookmarks.length; i++) {
        seq++;
        BOOKMARKS.forEach(function (bookmark) {
          if (bookmark.id == bookmarks[i].bookmarkId) {
            bookmark.seq = seq;
          }
        });
      }
    }
  }

  markFavour(id: number | string, isMyFavour: boolean): void {
    if (IS_USING_REAL_DATA) {
      let url = `${BASE_URL}&cmd=markFavCampusLinkOrNot&cx=${this.cx}&token=${this.token}&id=${id}&isMyFavour=${isMyFavour}`;
      this.http.post(url, REQUEST_OPTIONS).toPromise().then(res => res.json())
        .catch(err => handleError(err));
    } else {
      BOOKMARKS.forEach(function (bookmark) {
        if (bookmark.id == id) {
          bookmark.isMyFavour = isMyFavour;
        }
      });
    }
  }
}