import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProfileEducation } from '../../providers/profile/profile-education.interface';

import { ProfileService } from '../../providers/profile/profile.service';
import { UtilDialogService } from '../../providers/util/util-dialog.service';
import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, CAMPUS_DESIGN } from '../../providers/storage.service';

import { ProfileEducationDetailPage } from '../profile-education-detail/profile-education-detail';

@Component({
  selector: 'page-profile-education',
  templateUrl: 'profile-education.html',
  providers: [ProfileService, UtilDialogService]
})
export class ProfileEducationPage {

  private campusDesign: CampusDesign;

  private educationList: ProfileEducation[];

  private loaded: boolean = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private storageService: StorageService,
    private utilDialogServ: UtilDialogService,
    private profileServ: ProfileService
  ) {}

  private refreshList(): Promise<any> {
    return new Promise((reslove, reject) => {
      this.loaded = false;

      this.profileServ
        .getEducationList()
        .then((response) => {
          this.educationList = response;
          this.loaded = true;

          reslove();
        })
        .catch((error) => {
          this.utilDialogServ.showError(error);
          this.loaded = true;

          reject();
        });
    });
  }

  ngOnInit(): void {
    this.campusDesign = this.storageService.get(CAMPUS_DESIGN);
    this.refreshList().catch(error => {});
  }

  deleteItem(education: ProfileEducation) {
    this.utilDialogServ.showConfirm('Do you really want to delete it?', () => {
      let loading = this.utilDialogServ.getLoading();

      loading.show();

      this.profileServ
        .removeEducation(education.id)
        .then((response) => {
          return this.refreshList();
        })
        .then((response) => {
          loading.hide();
        })
        .catch((error) => {
          loading.hide();

          this.utilDialogServ.showError(error);
        });
    });
  }

  linkToDetail(education?: ProfileEducation): void {
    this.navCtrl.push(ProfileEducationDetailPage, {
      education: education,
      callback: this.refreshList.bind(this)
    });
  }
}
