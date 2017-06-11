import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormControl } from '@angular/forms';

import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, CAMPUS_DESIGN } from '../../providers/storage.service';

@Component({
  selector: 'page-textarea-edit',
  templateUrl: 'textarea-edit.html'
})
export class TextareaEditPage {

  private campusDesign: CampusDesign;

  private form: FormGroup;

  private isSubmit: boolean = false;

  private fieldInfo: object;

  private buildForm(): FormGroup {
    let formControl: FormControl = this.navParams.get('formControl');

    return new FormGroup({
      field: formControl
    });
  }

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private storageService: StorageService
  ) {
    this.form = this.buildForm();
    this.fieldInfo = this.navParams.get('fieldInfo');
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
      let callback = this.navParams.get('callback');

      if (typeof callback === 'function') {
        callback(this.form.value.field);
      }

      this.navCtrl.pop();
    }
  }
}
