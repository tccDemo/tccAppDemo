import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, CAMPUS_DESIGN } from '../../providers/storage.service';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-forgot-password-success',
  templateUrl: 'forgot-password-success.html'
})
export class ForgotPasswordSuccessPage {

  private campusDesign: CampusDesign;

  private tempPassword: string;

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private storageService: StorageService
  ) {
    this.tempPassword = navParams.get('tempPassword');
  }

  ngOnInit(): void {
    this.campusDesign = this.storageService.get(CAMPUS_DESIGN);
  }

  goToLoginPage(): void {
    this.navCtrl.push(LoginPage);
  }
}
