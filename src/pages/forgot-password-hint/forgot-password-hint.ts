import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

import { AuthPasswordHint } from '../../providers/auth/auth-passwrod-hint.interface';

import { AuthService } from '../../providers/auth/auth.service';
import { UtilDialogService } from '../../providers/util/util-dialog.service';
import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, CAMPUS_DESIGN } from '../../providers/storage.service';

import { ForgotPasswordSuccessPage } from '../forgot-password-success/forgot-password-success';

@Component({
  selector: 'page-forgot-password-hint',
  templateUrl: 'forgot-password-hint.html',
  providers: [AuthService, UtilDialogService]
})
export class ForgotPasswordHintPage {

  private campusDesign: CampusDesign;

  private userName: string;

  private userPasswordHint: AuthPasswordHint;

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
    this.userName = this.navParams.get('userName');
    this.userPasswordHint = this.navParams.get('userPasswordHint');
    this.form = this.buildForm();
  }

  private buildForm(): FormGroup {
    return this.formBuilder.group({
      passwordHintAns: ['', Validators.compose([
        Validators.required,
        Validators.maxLength(80)
      ])]
    });
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
      let loading = this.utilDialogServ.getLoading()

      loading.show();

      this.authServ
        .getTempPwd(this.userName, this.form.value.passwordHintAns)
        .then((response: string) => {
          loading.hide();

          this.navCtrl.push(ForgotPasswordSuccessPage, {tempPassword: response});
        })
        .catch((error) => {
          loading.hide();
          
          this.utilDialogServ.showError(error);
        });
    }    
  }
}
