import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { Profile } from '../../providers/profile/profile.interface';

import { UserAvatarComponent } from '../../components/user-avatar/user-avatar';

import { ProfileService } from '../../providers/profile/profile.service';
import { UtilDialogService } from '../../providers/util/util-dialog.service';
import { UserInfo } from '../../providers/userInfo';
import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, CAMPUS_DESIGN, USER_INFO } from '../../providers/storage.service';
import { AuthService } from '../../providers/auth/auth.service';

import { TextareaEditPage } from '../textarea-edit/textarea-edit';
import { StartupPage } from '../startup/startup';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
  providers: [ProfileService, UtilDialogService]
})
export class ProfilePage {

  private campusDesign: CampusDesign;

  private userInfo: UserInfo = null;

  private form: FormGroup;

  private isSubmit: boolean = false;

  private formTextareaSetting: object;

  private loaded: boolean = false;

  private profile: Profile;

  // @ViewChild(UserAvatarComponent)
  userAvatar: UserAvatarComponent;

  private getFormTextareaSetting(): object{
    return {
      homeRegion: {
        title: 'Home Region',
        placeholder: 'Enter as city, state.',
        minLength: 0,
        maxLength: 'The maximum length of a character is 32'
      },
      language: {
        title: 'Spoken Languages',
        placeholder: 'Separate each by comma.',
        minLength: 0,
        maxLength: 64
      },
      interest: {
        title: 'Interests / Hobbies',
        placeholder: 'Separate each by comma (for example : Baseball, Music) and limit to 64 characters.',
        minLength: 0,
        maxLength: 64
      },
      research: {
        title: 'Research Interests',
        placeholder: 'Limit to 256 characters.',
        minLength: 0,
        maxLength: 256
      }
    };
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      homeRegion: ['', [Validators.maxLength(this.formTextareaSetting['homeRegion'].maxLength)]],
      language: ['', [Validators.maxLength(this.formTextareaSetting['language'].maxLength)]],
      interest: ['', [Validators.maxLength(this.formTextareaSetting['interest'].maxLength)]],
      research: ['', [Validators.maxLength(this.formTextareaSetting['research'].maxLength)]]
    });
  }

  private getUserProfile(): Promise<any> {
    this.loaded = false;

    return new Promise((reslove, reject) => {
      this.profileServ
        .getProfile()
        .then((response) => {
          this.profile = response;
          this.form.setValue({
            homeRegion: response.homeRegion,
            language: response.language,
            interest: response.interest,
            research: response.research
          });
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

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private authServ: AuthService,
    private utilDialogServ: UtilDialogService,
    private profileServ: ProfileService
  ) {
    this.formTextareaSetting = this.getFormTextareaSetting();
    this.form = this.buildForm();
  }

  ngOnInit(): void {
    this.campusDesign = this.storageService.get(CAMPUS_DESIGN);
  }

  ionViewDidEnter(): void {
    this.userInfo = this.storageService.get(USER_INFO);
    this.getUserProfile().catch(error => {});
  }

  showTextareaEdit(fieldName: string, formControl: FormControl): void {
    this.navCtrl.push(TextareaEditPage, {
      formControl: formControl,
      fieldInfo: this.formTextareaSetting[fieldName],
      callback: (fieldValue: string) => {
        let patchValue = {};
        patchValue[fieldName] = fieldValue;
        this.form.patchValue(patchValue);
        this.evSubmitForm();
      }
    });
  }

  evSubmitForm(): void {
    if (!this.isSubmit) {
      for (let k in this.form.controls) {
        this.form.controls[k].markAsDirty();
      }

      this.isSubmit = true;
    }

    if (this.form.valid) {
      let loading = this.utilDialogServ.getLoading(),
          profile: Profile = {
            userId: this.profile.userId,
            userName: this.profile.userName,
            avatar: this.profile.avatar,
            email: this.profile.email,
            homeRegion: this.form.value.homeRegion,
            language: this.form.value.language,
            interest: this.form.value.interest,
            research: this.form.value.research
          };

       loading.show();

       this.profileServ
         .editProfile(profile)
         .then(() => {
           loading.hide();
         })
         .catch((error) => {
           loading.hide();
           // this.utilDialogServ.showError(error);
           this.utilDialogServ.showError('Unable to put profile');
         });

    }
  }

  logout(): void {
    this.utilDialogServ.showConfirm('Do you really want to log out?', () => {
      let loading = this.utilDialogServ.getLoading();

      this.authServ
        .removeAuth()
        .then(() => {
          loading.hide();

          this.navCtrl.push(StartupPage);
        })
        .catch((error) => {
          loading.hide();

          this.utilDialogServ.showError(error);
        });
    });
  }
}
