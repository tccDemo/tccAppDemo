import { Injectable } from '@angular/core';

import { Device } from '@ionic-native/device';

import { CampusInfo } from '../campusInfo';

import { UtilLogService } from '../util/util-log.service';
import { StorageService, CAMPUS_INFO, ACCESS_TOKEN } from '../storage.service';

import { DEFAULT_UUID } from '../tcc.service';

@Injectable()
export class AuthStorageService {
  constructor(
    private device: Device,
    private utilLogServ: UtilLogService,
    private storageServ: StorageService
  ) {}

  public getCampusInfo(): CampusInfo {
    let campusInfo = this.storageServ.get(CAMPUS_INFO);

    if (!campusInfo) {
      this.utilLogServ.warn('Unable to get CampusInfo from storage', undefined, 'AuthStorageService', 'getCampusInfo');
    }

    return campusInfo;
  }

  public getDeviceUUID(): string {
    let uuid: string = this.device.uuid;

    if (!uuid) {
      uuid = DEFAULT_UUID;
      this.utilLogServ.log(`Unable to get device uuid, use default id: ${DEFAULT_UUID}`, undefined, 'AuthStorageService', 'getDeviceUUID');
    }

    return uuid;
  }

  public getAccessToken(): string {
    let token = this.storageServ.get(ACCESS_TOKEN);

    if (!token) {
      this.utilLogServ.warn('Unable to get accesstoken from storage', undefined, 'AuthStorageService', 'getAccessToken');
      token = '';
    }

    return token;
  }

  public setAccessToken(token: string): void {
    this.utilLogServ.log(`Set accesstoken "${token}" to storage`, undefined, 'AuthStorageService', 'setAccessToken');
    this.storageServ.set(ACCESS_TOKEN, token);
  }

  public removeAccessToken() {
    this.utilLogServ.log('Remove accesstoken from storage', undefined, 'AuthStorageService', 'removeAccessToken');
    this.storageServ.remove(ACCESS_TOKEN);
  }
}