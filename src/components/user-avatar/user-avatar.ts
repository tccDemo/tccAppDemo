import { Component, Input } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';

import { UtilDialogService } from '../../providers/util/util-dialog.service';
import { ProfileService } from '../../providers/profile/profile.service';
import { UserInfo } from '../../providers/userInfo';
import { StorageService, USER_INFO } from '../../providers/storage.service';

@Component({
  selector: 'user-avatar',
  templateUrl: 'user-avatar.html',
  providers: [ProfileService, UtilDialogService]
})
export class UserAvatarComponent {

  @Input()
  userInfo: UserInfo;

  constructor(
    private camera: Camera,
    private storageService: StorageService,
    private utilDialogServ: UtilDialogService,
    private profileServ: ProfileService
  ) {}

  takePhoto() {
    let options: CameraOptions = {
      targetWidth: 100,
      // targetHeight: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      correctOrientation: true,
      saveToPhotoAlbum: true
    };

    this.camera.getPicture(options)
      .then((imageData) => {
        return this.profileServ.uploadAvatar(imageData);
      })
      .then(response => {
        return this.profileServ.downloadAvatar();
      })
      .then(response => {
        this.userInfo.profileIcon = response;
        this.storageService.set(USER_INFO, this.userInfo);
      })
      .catch(error => this.utilDialogServ.showError(error));
  }
}
