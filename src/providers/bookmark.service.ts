import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';

import { Bookmark } from './bookmark';
import { ALLBOOKMARKS, POPULARBOOKMARKS, RECENTBOOKMARKS, MYFAVBOOKMARKS } from './bookmark-mock';

import { CampusInfo } from './campusInfo';
import { ResourceService } from './resource/resource.service';
import { UtilLogService } from './util/util-log.service';
import { IS_USING_REAL_DATA, LOAD_COUNT } from './tcc.service';
import { StorageService, CAMPUS_INFO } from './storage.service';

@Injectable()
export class BookmarkService {

  campusInfo: CampusInfo;

  private getResourceUrl(): string {
    return `tcc_bookmark/22.${this.campusInfo.campusId}/`;
  }

  constructor(
    private resourceServ: ResourceService,
    private storageServ: StorageService,
    private utilLogServ: UtilLogService
  ) {
    this.campusInfo = this.storageServ.get(CAMPUS_INFO);
  }

  getAllBookmarks(): Promise<Bookmark[]> {
    let url = `${this.getResourceUrl()}Bookmark/list/all`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .getWithAuthentication(url)
          .then((response) => {
            this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'BookmarkService', 'getAllBookmarks');
            reslove(this.parseJSON(response));
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'BookmarkService', 'getAllBookmarks');
            reject(error);
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'BookmarkService', 'getAllBookmarks');
          reslove(this.getSortedBookmarks(this.parseJSON(ALLBOOKMARKS)));
        }, 1000);
      }
    });
  }

  getSortedBookmarks(bookmarks: Bookmark[]): Bookmark[] {
    return bookmarks.sort(function (b1, b2) {
      return b1.seq - b2.seq;
    });
  }

  getMyFavourBookmarks(): Promise<Bookmark[]> {

    let url = `${this.getResourceUrl()}Bookmark/list/favor`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .getWithAuthentication(url)
          .then((response) => {
            this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'BookmarkService', 'getMyFavourBookmarks');
            reslove(this.parseJSON(response));
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'BookmarkService', 'getMyFavourBookmarks');
            reject(error);
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'BookmarkService', 'getMyFavourBookmarks');
          reslove(this.getSortedBookmarks(this.parseJSON(MYFAVBOOKMARKS)));
        }, 1000);
      }
    });
  }

  getRecentlyBookmarks(): Promise<Bookmark[]> {
    let url = `${this.getResourceUrl()}Bookmark/list/recent`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .getWithAuthentication(url)
          .then((response) => {
            this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'BookmarkService', 'getRecentlyBookmarks');
            reslove(this.parseJSON(response));
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'BookmarkService', 'getRecentlyBookmarks');
            reject(error);
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'BookmarkService', 'getRecentlyBookmarks');
          reslove(this.getSortedBookmarks(this.parseJSON(RECENTBOOKMARKS)));
        }, 1000);
      }
    });
  }

  getPopularBookmarks(): Promise<Bookmark[]> {
    let url = `${this.getResourceUrl()}Bookmark/list/popular`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .getWithAuthentication(url)
          .then((response) => {
            this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'BookmarkService', 'getPopularBookmarks');
            reslove(this.parseJSON(response));
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'BookmarkService', 'getPopularBookmarks');
            reject(error);
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'BookmarkService', 'getPopularBookmarks');
          reslove(this.getSortedBookmarks(this.parseJSON(POPULARBOOKMARKS)));
        }, 1000);
      }
    });
  }

  getBookmark(id: string): Promise<Bookmark> {
    let url = `${this.getResourceUrl()}Bookmark/${id}`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .getWithAuthentication(url)
          .then((response) => {
            this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'BookmarkService', 'getBookmark');
            reslove(this.parseSingleJSON(response));
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'BookmarkService', 'getBookmark');
            reject(error);
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'BookmarkService', 'getBookmark');

          var ret: Bookmark = null;
          for (var i = 0; i < ALLBOOKMARKS.length; i++) {
            if (id == ALLBOOKMARKS[i].id) {
              ret = ALLBOOKMARKS[i];
              break;
            }
          }
          reslove(this.parseSingleJSON(ret));
        }, 1000);
      }
    });
  }

  updateSeqs(bookmarks: any): Promise<any> {
    let url = `${this.getResourceUrl()}Bookmark/list/favor`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {

        var ids = "";
        for (var i = 0; i < bookmarks.length; i++) {
          if (ids != "") {
            ids += ",";
          }
          ids += bookmarks[i].id;
        }

        this.resourceServ
          .putWithAuthentication(url, 
            {idList: ids}
          )
          .then((response) => {
            this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'BookmarkService', 'updateSeqs');
            reslove(response);
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'BookmarkService', 'updateSeqs');
            reject(error);
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'BookmarkService', 'updateSeqs');

          var seq = 0;
          for (var i = 0; i < bookmarks.length; i++) {
            seq++;
            MYFAVBOOKMARKS.forEach(function (bookmark) {
              if (bookmark.id == bookmarks[i].id) {
                bookmark.seq = seq;
              }
            });
          }
          reslove(this.getSortedBookmarks(this.parseJSON(MYFAVBOOKMARKS)));
        }, 1000);
      }
    });
  }

  markFavour(id: string, isMyFavour: boolean): Promise<Bookmark> {
    let url = `${this.getResourceUrl()}Bookmark/favor/${id}`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {

        if (isMyFavour) {
          this.resourceServ
            .postWithAuthentication(url, {})
            .then((response) => {
              this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'BookmarkService', 'markFavour');
              reslove(response);
            })
            .catch((error) => {
              this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'BookmarkService', 'markFavour');
              reject(error);
            });
        } else {
          this.resourceServ
            .deleteWithAuthentication(url)
            .then((response) => {
              this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'BookmarkService', 'markUnFavour');
              reslove(response);
            })
            .catch((error) => {
              this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'BookmarkService', 'markUnFavour');
              reject(error);
            });
        }
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'BookmarkService', 'markFavour');

          var currentBookmark = null;

          RECENTBOOKMARKS.forEach(function (bookmark) {
            if (bookmark.id == id) {
              bookmark.isMyFavour = isMyFavour;
              currentBookmark = bookmark;
            }
          });
          POPULARBOOKMARKS.forEach(function (bookmark) {
            if (bookmark.id == id) {
              bookmark.isMyFavour = isMyFavour;
              currentBookmark = bookmark;
            }
          });
          ALLBOOKMARKS.forEach(function (bookmark) {
            if (bookmark.id == id) {
              bookmark.isMyFavour = isMyFavour;
              currentBookmark = bookmark;
            }
          });

          if (isMyFavour) {
            ALLBOOKMARKS.forEach(function (bookmark) {
              if (bookmark.id == id) {
                MYFAVBOOKMARKS.push(bookmark);
                MYFAVBOOKMARKS[MYFAVBOOKMARKS.length - 1].seq = MYFAVBOOKMARKS.length;
                currentBookmark = bookmark;
              }
            });
          } else {
            for (var i = 0; i < MYFAVBOOKMARKS.length; i++) {
              if (MYFAVBOOKMARKS[i].id == id) {
                MYFAVBOOKMARKS.splice(i, 1);
                currentBookmark = MYFAVBOOKMARKS[i];
              }
            }
          }
          reslove(this.parseSingleJSON(currentBookmark));
        }, 1000);
      }
    });
  }

  parseJSON(res): Bookmark[] {
    // let objs = res.json();
    let objs = res;
    for (let i = 0; i < objs.length; i++) {
      if (objs[i].iconType == '102') {
        if (IS_USING_REAL_DATA) {
          objs[i].iconURL = `${this.campusInfo.host}/m?pg=Bookmark-Logo&bookmarkId=${objs[i].id}&cx=22.${this.campusInfo.campusId}`
        } else {
          objs[i].iconURL = `assets/images/bookmarks/${objs[i].id}.jpg`
        }
      }
    }
    return objs;
  }

  parseSingleJSON(res): Bookmark {
    // let obj = res.json();
    let obj = res;
    if (obj.iconType == '102') {
      if (IS_USING_REAL_DATA) {
        obj.iconURL = `${this.campusInfo.host}/m?pg=Bookmark-Logo&bookmarkId=${obj.id}&cx=22.${this.campusInfo.campusId}`
      } else {
        obj.iconURL = `assets/images/bookmarks/${obj.id}.jpg`
      }
    }
    return obj;
  }
}