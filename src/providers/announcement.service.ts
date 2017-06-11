import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import 'rxjs/add/operator/toPromise';

import { Announcement } from './announcement';
import { ANNOUNCEMENTS } from './announcement-mock';

import { CampusInfo } from './campusInfo';
import { ResourceService } from './resource/resource.service';
import { UtilLogService } from './util/util-log.service';
import { IS_USING_REAL_DATA, LOAD_COUNT } from './tcc.service';
import { StorageService, CAMPUS_INFO } from './storage.service';

@Injectable()
export class AnnouncementService {

  private getResourceUrl(): string {
    let campusInfo: CampusInfo = this.storageServ.get(CAMPUS_INFO);
    return `tcc_announcement/22.${campusInfo.campusId}/`;
  }

  constructor(
    private resourceServ: ResourceService,
    private storageServ: StorageService,
    private utilLogServ: UtilLogService
  ) { }

  getAnnouncementsByName(term: string): Promise<Announcement[]> {
    return this.getAnnouncements(1, 100).then((announcements: any) =>
      announcements.find(announcement => announcement.title.indexOf(term) != -1));
  }

  getAnnouncements(start: number, count: number = LOAD_COUNT): Promise<Announcement[]> {
    let url = `${this.getResourceUrl()}Announcement/list`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .getWithAuthentication(url, {
            start: start,
            count: count
          })
          .then((response) => {
            this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'AnnouncementService', 'getAnnouncements');
            reslove(this.parseJSON(response));
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'AnnouncementService', 'getAnnouncements');
            reject(error);
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'AnnouncementService', 'getAnnouncements');

          var ret: Announcement[] = [];
          if (start > 0 && start <= ANNOUNCEMENTS.length) {
            var end = start + count;
            if (end >= ANNOUNCEMENTS.length) {
              end = ANNOUNCEMENTS.length;
            }
            for (var i = start - 1, j = 0; i < end; i++ , j++) {
              ret[j] = ANNOUNCEMENTS[i];
            }
          }
          reslove(ret);
        }, 1000);
      }
    });
  }

  getNewAnnouncements(): Promise<Announcement[]> {
    return new Promise((reslove, reject) => {
      this.getAnnouncements(1, 100).then((announcements: Announcement[]) => {
        var ret = new Array();
        for (var i = 0; i < announcements.length; i++) {
          if (announcements[i].isNew) {
            ret.push(announcements[i]);
          }
        }
        reslove(ret);
      });
    });
  }

  markAllRead(): Promise<boolean> {
    let url = `${this.getResourceUrl()}Announcement/read/`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .putWithAuthentication(url, {})
          .then((response) => {
            this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'AnnouncementService', 'markAllRead');
            reslove(response);
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'AnnouncementService', 'markAllRead');
            reject(error);
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'AnnouncementService', 'markAllRead');

          for (var i = 0; i < ANNOUNCEMENTS.length; i++) {
            if (ANNOUNCEMENTS[i].isNew) {
              ANNOUNCEMENTS[i].isNew = false;
            }
          }
          reslove(ANNOUNCEMENTS);
        }, 1000);
      }
    });
  }

  getAnnouncement(id: string): Promise<Announcement> {
    let url = `${this.getResourceUrl()}Announcement/${id}`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .getWithAuthentication(url)
          .then((response) => {
            this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'AnnouncementService', 'getAnnouncement');
            reslove(this.parseSingleJSON(response));
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'AnnouncementService', 'getAnnouncement');
            reject(error);
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'AnnouncementService', 'getAnnouncement');

          var ret: Announcement = null;
          for (var i = 0; i < ANNOUNCEMENTS.length; i++) {
            if (id == ANNOUNCEMENTS[i].id) {
              ret = ANNOUNCEMENTS[i];
              break;
            }
          }
          reslove(ret);
        }, 1000);
      }
    });
  }

  parseJSON(res): Announcement[] {
    // let objs = res.json();
    let objs = res;
    for (let i = 0; i < objs.length; i++) {
      objs[i].postedDate = new Date(objs[i].postedAt);
    }
    return objs;
  }

  parseSingleJSON(res): Announcement {
    // let obj = res.json();
    let obj = res;
    obj.postedDate = new Date(obj.postedAt);
    return obj;
  }
}