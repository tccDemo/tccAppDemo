import { Injectable } from '@angular/core';

import 'rxjs/add/operator/toPromise';

import * as CryptoJS from 'crypto-js';
import * as jsSHA from 'jssha';

function _window(): any {
  return window;
}

@Injectable()
export class ResourceKeygenService {

  private iv: Array<number> = [0xb0, 0x7b, 0xf5, 0x22, 0xc8, 0xd6, 0x08, 0xb8, 0x81, 0xe2, 0x84, 0x8e, 0x91, 0x74, 0x74, 0xce];

  private salt: Array<number> = [0xca, 0xfe, 0xba, 0xbe, 0xba, 0xad, 0x12, 0x34];

  constructor() {}

  private stringToByteArray(input: string): Array<number> {
    let returnByteArray = [];

    for(let i = 0, strLength = input.length; i < strLength; i ++) {
      returnByteArray.push(input.charCodeAt(i));
    }

    return returnByteArray;
  }

  private stringToHexArray(input: string): Array<number> {
    let returnHexArray = [];

    for(let i = 0, strLength = input.length; i < strLength; i += 2) {
      returnHexArray.push(parseInt("0x" + input.substr(i, 2), 16));
    }

    return returnHexArray;
  }

  private arrayToHexString(input: Array<number>): string {
    let returnHexString = [];

    for(let i = 0, arrLength = input.length; i < arrLength; i ++) {
      let tmp = input[i].toString(16);

      if(tmp.length === 1) {
        tmp = '0' + tmp;
      }

      returnHexString.push(tmp); 
    }

    return returnHexString.join('');
  }

  private hexArrayMd5(inputHexArray: Array<number>): string {
    let win = _window();
    return win.faultylabs.MD5(inputHexArray);
  }

  private hexStringSha1(inputHexString: string): string {
    let hashObj = new jsSHA(
      'SHA-1',
      'HEX',
      {numRounds: 1}
    );
    hashObj.update(inputHexString);
    return hashObj.getHash('HEX');
  }

  private encrypt(keyMaterial: string, toBeEncrypted: string): string {
    let key = this.arrayToHexString(this.deriveKey(keyMaterial)),
        iv = this.arrayToHexString(this.iv);

    let encrypted = CryptoJS.AES.encrypt(toBeEncrypted, CryptoJS.enc.Hex.parse(key), {
      iv: CryptoJS.enc.Hex.parse(iv),
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
  }

  private deriveKey(keyMaterial: string): Array<number> {
    let deviceKey = [],
        tmpString = '',
        tmpArray = [];

    tmpString = this.hexArrayMd5(this.stringToByteArray(keyMaterial).concat(this.salt));
    tmpString = this.hexArrayMd5(this.stringToHexArray(tmpString));
    tmpArray = this.stringToHexArray(tmpString);

    deviceKey = deviceKey.concat(tmpArray.slice(0, 8));

    tmpString = this.hexStringSha1(this.arrayToHexString(tmpArray));
    tmpString = this.hexStringSha1(tmpString);
    tmpArray = this.stringToHexArray(tmpString);

    deviceKey = deviceKey.concat(tmpArray.slice(8, 16));

    return deviceKey;
  }

  private generateKey(sharedKey: string, installId: string, timestamp: string): string {
    return this.hexArrayMd5(this.stringToByteArray(timestamp + installId + sharedKey)).toLowerCase();
  }

  public encode(installId: string, type: string, original: string, ts: string): string {
    if (type === 'password') {
      return this.encrypt(installId, original);
    } else if (type === 'token') {
      if(original.indexOf && original.indexOf("%") > -1) {
        original = decodeURIComponent(original);
      }

      return encodeURIComponent(this.generateKey(original, installId, ts) + ':' + original);
    } else {
      throw new TypeError('Type must be \'password\' or \'token\'');
    }
  }
}