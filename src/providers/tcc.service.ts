import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { StorageService, CAMPUS_INFO, USER_INFO } from './storage.service';
import { CampusInfo } from './campusInfo';
import { UserInfo } from './userInfo';

export const BASE_URL: string = "http://ccstage.campuscruiser.com/DataServlet?pg=gb-ajax-data-test";

export const HEADERS: Headers = new Headers({ 'Content-Type': 'application/json' });

export const REQUEST_OPTIONS: RequestOptions = new RequestOptions({ headers: HEADERS });

export const IS_USING_REAL_DATA: boolean = true;     

export function handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
}

@Injectable()
export class TCCData {
    private campusInfo: CampusInfo;
    private userInfo: UserInfo;

    constructor(
        private storageService: StorageService
    ) {
        this.campusInfo = this.storageService.get(CAMPUS_INFO);
        this.userInfo = this.storageService.get(USER_INFO);
    }

    public getCampusId(): number {
        return this.campusInfo.campusId;
    }

    public getToken(): string {
        return this.userInfo.token;
    }
}

