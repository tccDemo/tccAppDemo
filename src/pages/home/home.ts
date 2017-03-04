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
  public avatarPath;
  public userAvatar : any = "assets/images/avatar/default.jpg";


  @ViewChild(BookmarkListPage)
  bookmarkListPage: BookmarkListPage;

  @ViewChild(AnnouncementListPage)
  announcementListPage: AnnouncementListPage;

  @ViewChild(EventListPage)
  eventListPage: EventListPage;

  constructor(public navCtrl: NavController) {

  }

  // takePhoto(){
  // 	let options = {
  // 		saveToPhotoAlbum: false,
  // 		cameraDirection: 1,
  // 		targetWidth: 50,
  // 		targetHeight: 50,
	// 	destinationType: Camera.DestinationType.DATA_URL
  // 	};
  //
  //   Camera.getPicture(options).then((imageData) => {
  //       this.base64Image = "data:image/jpeg;base64," + imageData;
  //   }, (err) => {
  //       console.log(err);
  //   });
  // }

    //Call camera
    takePhoto() {
        let options = {
            targetWidth: 50,
            targetHeight: 50,
            destinationType: Camera.DestinationType.FILE_URI,
            encodingType: Camera.EncodingType.JPEG,
            mediaType: Camera.MediaType.PICTURE,
            sourceType: Camera.PictureSourceType.CAMERA,
            correctOrientation: true,
            saveToPhotoAlbum: true
        };

        Camera.getPicture(options).then((imageData) => {
            let base64Image = imageData;
            this.avatarPath = base64Image;
            this.userAvatar = base64Image;
        }, (err) => {
            alert(err.toString());
        });
    }

}
