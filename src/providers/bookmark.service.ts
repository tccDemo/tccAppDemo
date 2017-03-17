import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Bookmark } from './bookmark';
import { ALLBOOKMARKS, POPULARBOOKMARKS, RECENTBOOKMARKS, MYFAVBOOKMARKS } from './bookmark-mock';
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
      return Promise.resolve(this.getSortedBookmarks(ALLBOOKMARKS));
    }
  }

  getSortedBookmarks(bookmarks: Bookmark[]): Bookmark[] {
    return bookmarks.sort(function (b1, b2) {
      return b1.seq - b2.seq;
    });
  }

  getMyFavourBookmarks(): Promise<Bookmark[]> {
    if (IS_USING_REAL_DATA) {
      let url = `${BASE_URL}&cmd=getMyFavCampusLinks&cx=${this.cx}&token=${this.token}`;
      return this.http.get(url).toPromise().then(res => res.json())
        .catch(err => alert(err));
    } else {
      return Promise.resolve(this.getSortedBookmarks(MYFAVBOOKMARKS));
    }
  }

  getRecentlyBookmarks(): Promise<Bookmark[]> {
    if (IS_USING_REAL_DATA) {
      let url = `${BASE_URL}&cmd=getRecentCampusLinks&cx=${this.cx}&token=${this.token}`;
      return this.http.get(url).toPromise().then(res => res.json())
        .catch(err => handleError(err));
    } else {
      return Promise.resolve(this.getSortedBookmarks(RECENTBOOKMARKS));
    }
  }

  getPopularBookmarks(): Promise<Bookmark[]> {
    if (IS_USING_REAL_DATA) {
      let url = `${BASE_URL}&cmd=getPopularCampusLinks&cx=${this.cx}&token=${this.token}`;
      return this.http.get(url).toPromise().then(res => res.json())
        .catch(err => handleError(err));
    } else {
      return Promise.resolve(this.getSortedBookmarks(POPULARBOOKMARKS));
    }
  }

  getBookmark(id: number): Promise<Bookmark> {
    if (IS_USING_REAL_DATA) {
      let url = `${BASE_URL}&cmd=getCampusLink&cx=${this.cx}&token=${this.token}&id=${id}`;
      return this.http.get(url).toPromise().then(res => res.json())
        .catch(err => handleError(err));
    } else {
      return Promise.resolve(this.getSortedBookmarks(ALLBOOKMARKS)).then(bookmarks => bookmarks.find(bookmark => bookmark.id == +id));
    }
  }

  updateSeqs(bookmarks: any): Promise<Bookmark[]> {
    if (IS_USING_REAL_DATA) {
      var ids = "";
      for (var i = 0; i < bookmarks.length; i++) {
        if (ids != "") {
          ids += ",";
        }
        ids += bookmarks[i].bookmarkId;
      }
      let url = `${BASE_URL}&cmd=reorderMyFavCampusLinks&cx=${this.cx}&token=${this.token}&ids=${ids}`;
      return this.http.get(url).toPromise().then(res => res.json())
        .catch(err => handleError(err));
    } else {
      var seq = 0;
      for (var i = 0; i < bookmarks.length; i++) {
        seq++;
        MYFAVBOOKMARKS.forEach(function (bookmark) {
          if (bookmark.id == bookmarks[i].bookmarkId) {
            bookmark.seq = seq;
          }
        });
      }
      return Promise.resolve(this.getSortedBookmarks(MYFAVBOOKMARKS));
    }
  }

  markFavour(id: number | string, isMyFavour: boolean): void {
    if (IS_USING_REAL_DATA) {
      let url = `${BASE_URL}&cmd=markFavCampusLinkOrNot&cx=${this.cx}&token=${this.token}&id=${id}&isMyFavour=${isMyFavour}`;
      this.http.get(url).toPromise().then(res => res.json())
        .catch(err => handleError(err));
    } else {

      RECENTBOOKMARKS.forEach(function (bookmark) {
        if (bookmark.id == id) {
          bookmark.isMyFavour = isMyFavour;
        }
      });
      POPULARBOOKMARKS.forEach(function (bookmark) {
        if (bookmark.id == id) {
          bookmark.isMyFavour = isMyFavour;
        }
      });
      ALLBOOKMARKS.forEach(function (bookmark) {
        if (bookmark.id == id) {
          bookmark.isMyFavour = isMyFavour;
        }
      });

      if (isMyFavour) {
        ALLBOOKMARKS.forEach(function (bookmark) {
          if (bookmark.id == id) {
            MYFAVBOOKMARKS.push(bookmark);
            MYFAVBOOKMARKS[MYFAVBOOKMARKS.length - 1].seq = MYFAVBOOKMARKS.length;
          }
        });
      } else {
        for (var i = 0; i < MYFAVBOOKMARKS.length; i++) {
          if (MYFAVBOOKMARKS[i].id == id) {
            MYFAVBOOKMARKS.splice(i, 1);
          }
        }
      }
    }
  }
}