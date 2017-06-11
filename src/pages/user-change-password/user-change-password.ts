import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { AuthService } from '../../providers/auth/auth.service';
import { UtilDialogService } from '../../providers/util/util-dialog.service';
import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, CAMPUS_DESIGN } from '../../providers/storage.service';

import { SettingPage } from '../setting/setting';

@Component({
  selector: 'page-user-change-password',
  templateUrl: 'user-change-password.html',
  providers: [UtilDialogService, AuthService]
})
export class UserChangePasswordPage {

  private campusDesign: CampusDesign;

  private form: FormGroup;

  private isSubmit: boolean = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private utilDialogServ: UtilDialogService,
    private authServ: AuthService
  ) {
    this.form = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(64)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(64)]],
      passwordConfirm: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(64), this.checkPasswordConfirm]],
    });
  }

  checkPasswordConfirm(control: FormControl) {
    if (control.value !== control.root.value.password) {
      return {
        equal: true
      };
    }

    return null;
  }

  ngOnInit(): void {
    this.campusDesign = this.storageService.get(CAMPUS_DESIGN);
  }

  evSubmitForm(): void {
    if (!this.isSubmit) {
      for (let k in this.form.controls) {
        this.form.controls[k].markAsDirty();
      }

      this.isSubmit = true;
    }
    
    if (this.form.valid) {
      let loading = this.utilDialogServ.getLoading();

      loading.show();

      this.authServ
        .changePassword(this.form.value.oldPassword, this.form.value.password, this.form.value.passwordConfirm)
        .then(() => {
          loading.hide();

          this.navCtrl.push(SettingPage);
        })
        .catch((error) => {
          loading.hide();
          
          this.utilDialogServ.showError(error);
        });
    }
  }
}
