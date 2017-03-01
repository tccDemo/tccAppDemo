import { Component, ViewChild } from '@angular/core';

import { NavController } from 'ionic-angular';
import { Camera } from 'ionic-native';

import { BookmarkListPage } from '../bookmark-list/bookmark-list';
import { AnnouncementListPage } from '../announcement-list/announcement-list';
import { EventListPage } from '../event-list/event-list';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  tab: string = "bookmark";
  public base64Image: string = null;

  @ViewChild(BookmarkListPage)
  bookmarkListPage: BookmarkListPage;

  @ViewChild(AnnouncementListPage)
  announcementListPage: AnnouncementListPage;

  @ViewChild(EventListPage)
  eventListPage: EventListPage;

  constructor(public navCtrl: NavController) {

  }

  doRefresh(refresher) {
    if(this.tab=="bookmark") {
      this.bookmarkListPage.doRefresh(refresher);	
    } else if(this.tab=="announcement") {
      this.announcementListPage.doRefresh(refresher);	
    } else if(this.tab=="event") {
      this.eventListPage.doRefresh(refresher);	
    }
      
  }


  takePhoto(){
  	let options = {
  		saveToPhotoAlbum: false,
  		cameraDirection: 1,
  		targetWidth: 50,
  		targetHeight: 50,
		destinationType: Camera.DestinationType.DATA_URL
  	};

    Camera.getPicture(options).then((imageData) => {
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });	
  }

}
