import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FooterPage } from '../footer/footer';

import { CampusInfo } from '../../providers/campusInfo';
import { UserInfo } from '../../providers/userInfo';
import { UserInfoService } from '../../providers/userInfo.service';
import { CampusInfoService } from '../../providers/campusInfo.service';
import { StorageService, USER_INFO, CAMPUS_INFO } from '../../providers/storage.service';

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
    ]
})
export class LoginPage {

    logoState: any = "in";
    cloudState: any = "in";
    loginState: any = "in";
    formState: any = "in";
    loginForm: FormGroup;

    campusId: number = 1;

    constructor(public navController: NavController,
        public navParams: NavParams,
        public formBuilder: FormBuilder,
        public toastCtrl: ToastController,
        public userInfoService: UserInfoService,
        public campusInfoService: CampusInfoService,
        public storageService: StorageService) {

        this.loginForm = this.formBuilder.group({
            'UserName': ['', [Validators.required, Validators.minLength(4)]],
            'Password': ['', [Validators.required, Validators.minLength(4)]]
        });
       this.campusInfoService.getCampusInfo(this.campusId).then(res => {  
            this.storageService.set(CAMPUS_INFO, res);
        })
    }

    login(value, _event) {
        _event.preventDefault();
        this.userInfoService.login(value.UserName, value.Password, this.campusId).then(res => {
            this.storageService.set(USER_INFO, res);  
            this.navController.push(FooterPage);
        })
      .catch(err => 
      {   
           alert(err);
           let toast = this.toastCtrl.create({
                message: 'Login or Password is wrong, please try again!',
                duration: 3000,
                position: 'top',
                showCloseButton: true,
                closeButtonText: 'Close'
            });
            toast.present();
      });
    }
}
