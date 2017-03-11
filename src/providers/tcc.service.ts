import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';

    // public url: string = "http://ccstage.campuscruiser.com/DataServlet?pg=gb-ajax-data-test&cmd=getCampusAnnouncements&cx=22.1&login=xuzp";
export const BASE_URL: string = "http://ccstage.campuscruiser.com/DataServlet?pg=gb-ajax-data-test&";

export const HEADERS: Headers = new Headers({ 'Content-Type': 'application/json' });

export const REQUEST_OPTIONS: RequestOptions = new RequestOptions({ headers: HEADERS });

export function handleError(error: any): Promise<any> {
    console.error('An error occurred', error);
    return Promise.reject(error.message || error);
}

