import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { ProfileWorkExperience } from '../../providers/profile/profile-work-experience.interface';

import { ProfileService } from '../../providers/profile/profile.service';
import { UtilDialogService } from '../../providers/util/util-dialog.service';
import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, CAMPUS_DESIGN } from '../../providers/storage.service';

import { TextareaEditPage } from '../textarea-edit/textarea-edit';
import { SelectEditPage } from '../select-edit/select-edit';

@Component({
  selector: 'page-profile-work-experience-detail',
  templateUrl: 'profile-work-experience-detail.html',
  providers: [ProfileService, UtilDialogService]
})
export class ProfileWorkExperienceDetailPage {

  private campusDesign: CampusDesign;

  private form: FormGroup;

  private isSubmit: boolean = false;

  private workExperience: ProfileWorkExperience;

  private formTextareaSetting: object;

  private formSelectSetting: object;

  private getIndustryOptions(): Array<object> {
    return [
      {id: 'Accommodation Services', text: 'Accommodation Services'},
      {id: 'Administrative Services', text: 'Administrative Services'},
      {id: 'Agriculture', text: 'Agriculture'},
      {id: 'Armed Forces', text: 'Armed Forces'},
      {id: 'Arts', text: 'Arts'},
      {id: 'Computer Hardware', text: 'Computer Hardware'},
      {id: 'Computer Software', text: 'Computer Software'},
      {id: 'Construction', text: 'Construction'},
      {id: 'Entertainment', text: 'Entertainment'},
      {id: 'Educational Services', text: 'Educational Services'},
      {id: 'Finance', text: 'Finance'},
      {id: 'Food services', text: 'Food services'},
      {id: 'Health Care', text: 'Health Care'},
      {id: 'Information', text: 'Information'},
      {id: 'Insurance', text: 'Insurance'},
      {id: 'Leasing', text: 'Leasing'},
      {id: 'Management Service', text: 'Management Service'},
      {id: 'Manufacturing', text: 'Manufacturing'},
      {id: 'Mining', text: 'Mining'},
      {id: 'Public Administration', text: 'Public Administration'},
      {id: 'Professional Services', text: 'Professional Services'},
      {id: 'Retail Trade', text: 'Retail Trade'},
      {id: 'Recreation', text: 'Recreation'},
      {id: 'Real Estate', text: 'Real Estate'},
      {id: 'Rental', text: 'Rental'},
      {id: 'Scientific Services', text: 'Scientific Services'},
      {id: 'Social Assistance', text: 'Social Assistance'},
      {id: 'Support Services', text: 'Support Services'},
      {id: 'Technical Services', text: 'Technical Services'},
      {id: 'Transportation', text: 'Transportation'},
      {id: 'Utilities', text: 'Utilities'},
      {id: 'Warehousing', text: 'Warehousing'},
      {id: 'Wholesale Trade', text: 'Wholesale Trade'},
      {id: 'other', text: 'Other...'}
    ];
  }

  private getFormTextareaSetting(): object {
    return {
      duty: {
        title: 'Duties',
        placeholder: 'Please enter 2 to 3 sentences regarding work duties.',
        minLength: 0,
        maxLength: 1024
      }
    };
  }

  private getFormSelectSetting(): object {
    return {
      industry: {
        title: 'Industry',
        options: this.getIndustryOptions()
      }
    };
  }

  private buildForm(): FormGroup {
    let workExperience = this.workExperience;

    if (!workExperience) {
      workExperience = {
        company: '',
        industry: '',
        title: '',
        duty: ''
      };
    }

    let defaultStartTime = null,
        defaultEndTime = null;

    if (workExperience.beginYear && workExperience.beginMonth) {
      let tmpDate = new Date();
      tmpDate.setFullYear(parseInt(workExperience.beginYear, 10));
      tmpDate.setMonth(parseInt(workExperience.beginMonth, 10) - 1);
      defaultStartTime = tmpDate.toISOString();
    }

    if (workExperience.endYear && workExperience.endMonth) {
      let tmpDate = new Date();
      tmpDate.setFullYear(parseInt(workExperience.endYear, 10));
      tmpDate.setMonth(parseInt(workExperience.endMonth, 10) - 1);
      defaultEndTime = tmpDate.toISOString();
    }

    return this.formBuilder.group({
      company: [workExperience.company, Validators.compose([
        Validators.required,
        Validators.maxLength(64)
      ])],
      location: [workExperience.location, Validators.maxLength(64)],
      industry: [workExperience.industry, Validators.required],
      title: [workExperience.title, Validators.compose([
        Validators.required,
        Validators.maxLength(64)
      ])],
      startTime: defaultStartTime,
      endTime: defaultEndTime,
      duty: [workExperience.duty, Validators.compose([
        Validators.required,
        Validators.maxLength(1024)
      ])]
    });
  }

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private formBuilder: FormBuilder,
    private storageService: StorageService,
    private utilDialogServ: UtilDialogService,
    private profileServ: ProfileService
  ) {
    this.workExperience = this.navParams.get('workExperience');
    this.form = this.buildForm();
    this.formTextareaSetting = this.getFormTextareaSetting();
    this.formSelectSetting = this.getFormSelectSetting();
  }

  ngOnInit(): void {
    this.campusDesign = this.storageService.get(CAMPUS_DESIGN);
  }

  showTextareaEdit(fieldName: string, formControl: FormControl): void {
    this.navCtrl.push(TextareaEditPage, {
      formControl: formControl,
      fieldInfo: this.formTextareaSetting[fieldName],
      callback: (fieldValue: string) => {
        let patchValue = {};
        patchValue[fieldName] = fieldValue;
        this.form.patchValue(patchValue);
      }
    });
  }

  showSelectEdit(fieldName: string, formControl: FormControl): void {
    this.navCtrl.push(SelectEditPage, {
      formControl: formControl,
      fieldInfo: this.formSelectSetting[fieldName],
      callback: (fieldValue: string) => {
        let patchValue = {};
        patchValue[fieldName] = fieldValue;
        this.form.patchValue(patchValue);
      }
    });
  }

  clearDateVal(fieldName: string): void {
    let patchValue = {};
    patchValue[fieldName] = '';
    this.form.patchValue(patchValue);
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
          callback = this.navParams.get('callback'),
          workExperience: ProfileWorkExperience = {
            company: this.form.value.company,
            location: this.form.value.location,
            industry: this.form.value.industry,
            title: this.form.value.title,
            duty: this.form.value.duty,
            beginMonth: '',
            beginYear: '',
            endMonth: '',
            endYear: ''
          };

      loading.show();

      if (this.form.value.startTime && typeof this.form.value.startTime === 'string') {
        [workExperience.beginYear, workExperience.beginMonth] = this.form.value.startTime.split('-');
      }

      if (this.form.value.endTime && typeof this.form.value.endTime === 'string') {
        [workExperience.endYear, workExperience.endMonth] = this.form.value.endTime.split('-');
      }

      if (!this.navParams.get('workExperience')) {
        this.profileServ
          .addWorkExperience(workExperience)
          .then((response) => {
            loading.hide();

            if (typeof callback === 'function') {
              callback();
            }

            this.navCtrl.pop();
          })
          .catch((error) => {
            loading.hide();

            this.utilDialogServ.showError(error);
          });
      } else {
        this.profileServ
          .editWorkExperience(this.workExperience.id, workExperience)
          .then((response) => {
            loading.hide();

            if (typeof callback === 'function') {
              callback();
            }

            this.navCtrl.pop();
          })
          .catch((error) => {
            loading.hide();

            this.utilDialogServ.showError(error);
          });
      }
    }
  }
}
