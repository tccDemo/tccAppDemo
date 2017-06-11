import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

import { AuthService } from '../../providers/auth/auth.service';
import { UtilDialogService } from '../../providers/util/util-dialog.service';
import { CampusInfo } from '../../providers/campusInfo';
import { CampusInfoService } from '../../providers/campusInfo.service';

import { StorageService, USER_INFO, CAMPUS_INFO, CAMPUS_DESIGN } from '../../providers/storage.service';

import { LoginPage } from '../login/login';
import { FooterPage } from '../footer/footer';

@Component({
  selector: 'page-startup',
  templateUrl: 'startup.html',
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
  providers: [UtilDialogService, AuthService]
})
export class StartupPage {

  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";
  form: FormGroup;

  constructor(
    public navController: NavController,
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public toastCtrl: ToastController,
    public campusInfoService: CampusInfoService,
    public loadingCtrl: LoadingController,    
    public storageService: StorageService,
    private utilDialogServ: UtilDialogService,
    private authServ: AuthService
  ) {

    this.form = this.formBuilder.group({
      'CampusCode': ['', [Validators.required, Validators.minLength(2)]]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Startup');
  }

  ionViewDidEnter(): void {
    if (this.authServ.isAuth()) {
      this.navController.push(FooterPage);
    }
  }

  chooseCampus(value, _event) {
    _event.preventDefault();

    let loading = this.utilDialogServ.getLoading();

    loading.show();

    this.campusInfoService
      .getCampusAppInfo(value.CampusCode)
      .then(res => {
        this.storageService.set(CAMPUS_INFO, res);

        return this.campusInfoService.getCampusDesign(res);
      })
      .then(res2 => {
        setTimeout(() => {
          this.storageService.set(CAMPUS_DESIGN, res2);
          loading.hide();
          this.navController.push(LoginPage);
        }, 500);
      })
      .catch(err => {
        loading.hide();
        this.utilDialogServ.showError('Campus Code is invalid, please try again!')
      });
  }
}
