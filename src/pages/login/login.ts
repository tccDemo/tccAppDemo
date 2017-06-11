import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FooterPage } from '../footer/footer';

import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import { CampusInfo } from '../../providers/campusInfo';
import { CampusDesign } from '../../providers/campusDesign';
import { UserInfo } from '../../providers/userInfo';
import { UserInfoService } from '../../providers/userInfo.service';

import { AuthService } from '../../providers/auth/auth.service';
import { UtilDialogService } from '../../providers/util/util-dialog.service';
import { CampusInfoService } from '../../providers/campusInfo.service';
import { CAMPUSDESIGN_DEFAULT } from '../../providers/campusDesign-default';
import { FCMService } from '../../providers/fcm.service';

import { StorageService, USER_INFO, CAMPUS_INFO, CAMPUS_DESIGN } from '../../providers/storage.service';

import { ForgotPasswordPage } from '../forgot-password/forgot-password';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  animations: [

    //For the logo
    trigger('flyInBottomSlow', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0' }),
        animate('2000ms ease-in-out')
      ])
    ]),

    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({ transform: 'translate3d(0,2000px,0)' }),
        animate('1000ms ease-in-out')
      ])
    ]),

    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('2000ms 200ms ease-in', keyframes([
          style({ transform: 'translate3d(0,2000px,0)', offset: 0 }),
          style({ transform: 'translate3d(0,-20px,0)', offset: 0.9 }),
          style({ transform: 'translate3d(0,0,0)', offset: 1 })
        ]))
      ])
    ]),

    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({ opacity: 0 }),
        animate('1000ms 2000ms ease-in')
      ])
    ])
  ],
  providers: [UtilDialogService, AuthService, FCMService]
})
export class LoginPage {

  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";
  loginForm: FormGroup;

  campusInfo: CampusInfo;
  campusDesign: CampusDesign = CAMPUSDESIGN_DEFAULT;

  constructor(public navController: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public userInfoService: UserInfoService,
    public campusInfoService: CampusInfoService,
    public loadingCtrl: LoadingController,
    public fcmService: FCMService,
    public storageService: StorageService,
    private utilDialogServ: UtilDialogService,
    private authServ: AuthService
  ) {
    this.loginForm = this.formBuilder.group({
      'UserName': ['', [Validators.required, Validators.minLength(4)]],
      'Password': ['', [Validators.required, Validators.minLength(4)]]
    });
  }

  ngOnInit() {
    this.campusInfo = this.storageService.get(CAMPUS_INFO);
    this.campusDesign = this.storageService.get(CAMPUS_DESIGN);
  }

  evLogin(value, _event): void {
    _event.preventDefault();

    if (this.loginForm.valid) {
      let loading = this.utilDialogServ.getLoading('');

      loading.show();

      this.authServ
        .setAuth(value.UserName, value.Password)
        .then((response) => {
          return this.userInfoService.getUserInfo(value.UserName, value.Password, this.campusInfo.campusId);
        })
        .then((response) => {
          this.storageService.set(USER_INFO, response);

          this.fcmService.saveUserDeviceInfo()
            .catch((error) => {
              console.log("Failed to save user device");
            });
        })
        .then((response) => {
          loading.hide();
          this.navController.push(FooterPage);
        })
        .catch((error) => {
          loading.hide();
          this.utilDialogServ.showError(error);
        });
    } else {
      for (let k in this.loginForm.controls) {
        let control = this.loginForm.controls[k];

        if (!control.valid) {
          let fieldName = k === 'UserName' ? 'Login ID' : 'Password';

          if (control.hasError('required')) {
            this.utilDialogServ.showError(`${fieldName} is required`);
          } else if (control.hasError('minlength')) {
            this.utilDialogServ.showError(`${fieldName} need to enter at least 4 characters.`);
          }

          break;
        }
      }
    }
  }

  linkToForgotPassword() {
    this.navController.push(ForgotPasswordPage);
  }
}