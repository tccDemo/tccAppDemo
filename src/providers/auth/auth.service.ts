import { Injectable } from '@angular/core';

import { AuthPasswordHint } from './auth-passwrod-hint.interface';
import { CampusInfo } from '../campusInfo';

import { UtilLogService } from '../util/util-log.service';
import { AuthStorageService } from '../auth/auth-storage.service';
import { ResourceService } from '../resource/resource.service';
import { ResourceKeygenService } from '../resource/resource-keygen.service';
import { IS_USING_REAL_DATA } from '../tcc.service';

import { AUTH_PASSWORD_HINT_MOCK } from './auth-passwrod-hint-list-mock';

@Injectable()
export class AuthService {

  private getResourceUrl(): string {
    let campusInfo: CampusInfo = this.authStorageServ.getCampusInfo();

    return `tcc_auth/22.${campusInfo.campusId}/`;
  }

  constructor(
    private utilLogServ: UtilLogService,
    private authStorageServ: AuthStorageService,
    private resourceServ: ResourceService,
    private resourceKeygenServ: ResourceKeygenService
  ) {}

  public isAuth(): boolean {
    let token = this.authStorageServ.getAccessToken();

    if (!token || token == '') {
      return false;
    } else {
      return true;
    }
  }

  public setAuth(account: string, password: string): Promise<any> {
    let campusInfo = this.authStorageServ.getCampusInfo(),
        installId = this.authStorageServ.getDeviceUUID(),
        url = this.getResourceUrl();

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        let ts: string = new Date().getTime().toString();

        this.resourceServ
          .get(url, {
            'campusId': campusInfo.campusId,
            'account': account,
            'encryptedPassword': this.resourceKeygenServ.encode(installId, 'password', password, ts),
            'installId': installId
          })
          .then((response) => {
            if (response.apiToken) {
              this.utilLogServ.log(`Get resource "${url}" success`, {account: account, password: password}, 'AuthService', 'auth');
              this.authStorageServ.setAccessToken(response.apiToken);
              reslove();
            } else {
              this.utilLogServ.warn('Unable to find token', {response: response}, 'AuthService', 'auth');
              reject('Login or Password is wrong, please try again!');
            }
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, {account: account, password: password}, 'AuthService', 'auth');
            reject('Login or Password is wrong, please try again!');
          });
      } else {
        this.utilLogServ.log(`Get resource "${url}" use fake data`, {account: account, password: password}, 'AuthService', 'getPwdHint');
        this.authStorageServ.setAccessToken('fake-token');
        reslove();
      }
    });
  }

  public removeAuth(): Promise<any> {
    return new Promise((reslove, reject) => {
      setTimeout(() => {
        this.authStorageServ.removeAccessToken();
        reslove();
      }, 500);
    });
  }

  public getPwdHint(userName: string): Promise<AuthPasswordHint> {
    let url = `${this.getResourceUrl()}${encodeURIComponent(userName)}/PwdHint`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .get(url)
          .then((response) => {
            this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'AuthService', 'getPwdHint');
            reslove(response);
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'AuthService', 'getPwdHint');
            reject('Unable to get passwordHint');
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'AuthService', 'getPwdHint');
          reslove(AUTH_PASSWORD_HINT_MOCK);
        }, 1000);
      }
    });
  }

  public getTempPwd(userName: string, passwordHintAns: string): Promise<string> {
    let url = `${this.getResourceUrl()}${encodeURIComponent(userName)}/TempPwd`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .get(url, {
            passwordHintAns: passwordHintAns
          })
          .then((response) => {
            this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'AuthService', 'getTempPwd');
            reslove(response.tempPwd);
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'AuthService', 'getTempPwd');
            reject('Unable to get temporary password');
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'AuthService', 'getTempPwd');
          reslove('111906Jg');
        }, 1000);
      }
    });
  }

  public changePassword(oldPassword: string, password: string, repeatedPassword: string): Promise<any> {
    let url = `${this.getResourceUrl()}Pwd`,
        ts: string = new Date().getTime().toString(),
        installId = this.authStorageServ.getDeviceUUID();

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .putWithAuthentication(url, {
            oldPassword: this.resourceKeygenServ.encode(installId, 'password', oldPassword, ts),
            password: this.resourceKeygenServ.encode(installId, 'password', password, ts),
            repeatedPassword: this.resourceKeygenServ.encode(installId, 'password', repeatedPassword, ts)
          })
          .then((response) => {
            this.utilLogServ.log(`Put resource "${url}" success`, {
              oldPassword: oldPassword,
              password: password,
              repeatedPassword: repeatedPassword
            }, 'AuthService', 'changePassword');
            reslove();
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, {
              oldPassword: oldPassword,
              password: password,
              repeatedPassword: repeatedPassword
            }, 'AuthService', 'changePassword');

            reject(error);
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Put resource "${url}" use fake data`, {
            oldPassword: oldPassword,
            password: password,
            repeatedPassword: repeatedPassword
          }, 'AuthService', 'changePassword');
          reslove();
        }, 1000);
      }
    });
  }
}