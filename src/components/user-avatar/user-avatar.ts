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
    public base64Image: string = null;
    public avatarPath;
    public userAvatar: string = "assets/images/avatar/default.png";
    private userInfo: UserInfo = null;

    constructor(private storageService: StorageService) {

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
            let base64Image = imageData;
            this.avatarPath = base64Image;
            this.userAvatar = base64Image;
            this.userInfo.profileIcon = this.userAvatar;
            this.storageService.set(USER_INFO, this.userInfo);
            alert(this.userInfo.profileIcon);
        }, (err) => {
            console.log(err.toString());
        });
    }

    ngOnInit(): void {
        this.userInfo = this.storageService.get(USER_INFO);
        if (this.userInfo.profileIcon != "") {
            this.userAvatar = this.userInfo.profileIcon;
        }
        alert(this.userInfo.profileIcon);
    }

}
