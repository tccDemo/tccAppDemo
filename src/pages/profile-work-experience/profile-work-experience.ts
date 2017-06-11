import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { ProfileWorkExperience } from '../../providers/profile/profile-work-experience.interface';

import { ProfileService } from '../../providers/profile/profile.service';
import { UtilDialogService } from '../../providers/util/util-dialog.service';
import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, CAMPUS_DESIGN } from '../../providers/storage.service';

import { ProfileWorkExperienceDetailPage } from '../profile-work-experience-detail/profile-work-experience-detail';

@Component({
  selector: 'page-profile-work-experience',
  templateUrl: 'profile-work-experience.html',
  providers: [ProfileService, UtilDialogService]
})
export class ProfileWorkExperiencePage {

  private campusDesign: CampusDesign;

  private workExperienceList: ProfileWorkExperience[];

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
        .getWorkExperienceList()
        .then((response) => {
          this.workExperienceList = response;
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

  deleteItem(workExperience: ProfileWorkExperience) {
    this.utilDialogServ.showConfirm('Do you really want to delete it?', () => {
      let loading = this.utilDialogServ.getLoading();

      loading.show();

      this.profileServ
        .removeWorkExperience(workExperience.id)
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

  linkToDetail(workExperience?: ProfileWorkExperience): void {
    this.navCtrl.push(ProfileWorkExperienceDetailPage, {
      workExperience: workExperience,
      callback: this.refreshList.bind(this)
    });
  }
}
