import {Component, OnInit, Input} from '@angular/core';

import {Camera} from 'ionic-native';

@Component({
    selector: 'user-avatar',
    templateUrl: 'user-avatar.html'
})

export class UserAvatarComponent implements OnInit {

    @Input()
    public base64Image: string = null;
    public avatarPath;
    public userAvatar: any = "assets/images/avatar/default.jpg";

    // call camera API
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

    ngOnInit() {
        console.log('user avatar');
    }
}
