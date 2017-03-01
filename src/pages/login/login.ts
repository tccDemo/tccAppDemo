import { Component, trigger, state, style, transition, animate, keyframes } from '@angular/core';  		
import { NavController, NavParams, AlertController, ToastController } from 'ionic-angular';
import { FormBuilder, Validators,FormGroup } from '@angular/forms';
import { TabsPage } from '../tabs/tabs';

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
        style({transform: 'translate3d(0,2000px,0'}),
        animate('2000ms ease-in-out')
      ])
    ]),

    //For the background detail
    trigger('flyInBottomFast', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        style({transform: 'translate3d(0,2000px,0)'}),
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
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1}) 
        ]))
      ])
    ]),

    //For login button
    trigger('fadeIn', [
        state('in', style({
            opacity: 1
        })),
        transition('void => *', [
            style({opacity: 0}),
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
   


  constructor(public navController: NavController, public navParams: NavParams,
   public alertCtrl: AlertController, public formBuilder: FormBuilder,
   public toastCtrl: ToastController) {

  	this.loginForm = this.formBuilder.group({
		'LoginID': ['', [Validators.required, Validators.minLength(4)]],
		'LoginPwd': ['', [Validators.required, Validators.minLength(4)]]
	  });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  login(value, _event) {
    _event.preventDefault();
console.log(value)
  	if(value.LoginID=="test" && value.LoginPwd=="test") {
  		this.navController.push(TabsPage);
  	} else {
    	// let alert = this.alertCtrl.create({
     //  		title: 'WRONG!',
     //  		subTitle: 'Login or Password is wrong, please try again!',
     //  		buttons: ['OK']
    	// });
    	// alert.present();

       let toast = this.toastCtrl.create({
          message: 'Login or Password is wrong, please try again!',
          duration: 3000,
          position: 'top',
          showCloseButton: true,
          closeButtonText: 'Close'
        });
        toast.present();
  	}
    
  }


}
