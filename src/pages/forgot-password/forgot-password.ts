import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthPasswordHint } from '../../providers/auth/auth-passwrod-hint.interface';

import { AuthService } from '../../providers/auth/auth.service';
import { UtilDialogService } from '../../providers/util/util-dialog.service';
import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, CAMPUS_DESIGN } from '../../providers/storage.service';

import { ForgotPasswordHintPage } from '../forgot-password-hint/forgot-password-hint';

@Component({
  selector: 'page-forgot-password',
  templateUrl: 'forgot-password.html',
  providers: [AuthService, UtilDialogService]
})
export class ForgotPasswordPage {

  private campusDesign: CampusDesign;

  private form: FormGroup;

  private isSubmit: boolean = false;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private storageServ: StorageService,
    private utilDialogServ: UtilDialogService,
    private authServ: AuthService
  ) {
    this.form = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      userName: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(64)
      ])]
    });
  }

  ngOnInit(): void {
    this.campusDesign = this.storageServ.get(CAMPUS_DESIGN);
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
          userName: string = this.form.value.userName;

      loading.show();

      this.authServ
        .getPwdHint(userName)
        .then((response: AuthPasswordHint) => {
          loading.hide();

          this.navCtrl.push(ForgotPasswordHintPage, {
            userName: userName,
            userPasswordHint: response
          });
        })
        .catch((error) => {
          loading.hide();
          
          this.utilDialogServ.showError(error);
        });
    }
  }
}
