import { Component, Input } from '@angular/core';

import { UserInfo } from '../../providers/userInfo';
import { StorageService, USER_INFO } from '../../providers/storage.service';

import { Camera } from 'ionic-native';

@Component({
    selector: 'user-avatar',
    templateUrl: 'user-avatar.html'
})
export class UserAvatarComponent {

    @Input()
    userInfo: UserInfo;

    constructor(public storageService: StorageService) {

    }

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
            this.userInfo.profileIcon = imageData;
            this.storageService.set(USER_INFO, this.userInfo);
        }, (err) => {
            console.log(err.toString());
        });
    }
}
