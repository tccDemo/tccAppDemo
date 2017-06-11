import { Injectable } from '@angular/core';

export const USER_INFO: string = "userInfo";
export const CAMPUS_INFO: string = "campusInfo";
export const CAMPUS_DESIGN: string = "campusDesign";
export const ACCESS_TOKEN: string = "accessToken";

@Injectable()
export class StorageService {
  constructor() {
  };

  set(key: string, value: any) {
    if (value) {
      value = JSON.stringify(value);
    }
    localStorage.setItem(key, value);
  }

  get(key: string) {
    let value = localStorage.getItem(key);
    if (value && value != "undefined" && value != "null") {
      return JSON.parse(value);
    }
    return null;
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }
}
