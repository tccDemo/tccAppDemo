import { Injectable  } from '@angular/core';

@Injectable()
export class StorageService {
  constructor() {
  };

  set(key:string, value:any) {
    if (value) {
      value = JSON.stringify(value);//将value对象转换成字符串
    }
    localStorage.setItem(key, value);
  }

  get(key:string) {
    let value = localStorage.getItem(key);
    if (value && value != "undefined" && value != "null") {
      return JSON.parse(value);
    }
    return null;
  }
}
