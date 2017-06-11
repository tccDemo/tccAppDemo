import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

import { ProfileEducation } from '../../providers/profile/profile-education.interface';

import { ProfileService } from '../../providers/profile/profile.service';
import { UtilDialogService } from '../../providers/util/util-dialog.service';
import { CampusDesign } from '../../providers/campusDesign';
import { StorageService, CAMPUS_DESIGN } from '../../providers/storage.service';

import { SelectEditPage } from '../select-edit/select-edit';

@Component({
  selector: 'page-profile-education-detail',
  templateUrl: 'profile-education-detail.html',
  providers: [ProfileService, UtilDialogService]
})
export class ProfileEducationDetailPage {

  private campusDesign: CampusDesign;

  private form: FormGroup;

  private isSubmit: boolean = false;

  private education: ProfileEducation;

  private formSelectSetting: object;

  private getDegreeOptions(): Array<object> {
    return [
      {id: 'Certificate', text: 'Certificate'},
      {id: 'High School', text: 'High School'},
      {id: 'A.A.', text: 'A.A.'},
      {id: 'B.A.', text: 'B.A.'},
      {id: 'B.S.', text: 'B.S.'},
      {id: 'D.M.A.', text: 'D.M.A.'},
      {id: 'Ed.D.', text: 'Ed.D.'},
      {id: 'Ed.M.', text: 'Ed.M.'},
      {id: 'J.D.', text: 'J.D.'},
      {id: 'M.A.', text: 'M.A.'},
      {id: 'M.B.A.', text: 'M.B.A.'},
      {id: 'M.D.', text: 'M.D.'},
      {id: 'M.E.D.', text: 'M.E.D.'},
      {id: 'M.F.A.', text: 'M.F.A.'},
      {id: 'M.L.A.', text: 'M.L.A.'},
      {id: 'M.M.', text: 'M.M.'},
      {id: 'M.M.T.', text: 'M.M.T.'},
      {id: 'M.S.', text: 'M.S.'},
      {id: 'M.S.E.', text: 'M.S.E.'},
      {id: 'M.S.Ed.', text: 'M.S.Ed.'},
      {id: 'Ph.D.', text: 'Ph.D.'},
      {id: 'other', text: 'other'}
    ];
  }

  private getMajorOptions(): Array<object> {
    return [
      {id: 'High School', text: 'High School'},
      {id: 'Accounting', text: 'Accounting'},
      {id: 'Adult & Continuing Education', text: 'Adult & Continuing Education'},
      {id: 'Aerospace Aeronautical', text: 'Aerospace Aeronautical'},
      {id: 'African American Studies', text: 'African American Studies'},
      {id: 'African Studies', text: 'African Studies'},
      {id: 'Agricultural Engineering', text: 'Agricultural Engineering'},
      {id: 'Agricultural Sciences', text: 'Agricultural Sciences'},
      {id: 'American Literature', text: 'American Literature'},
      {id: 'American Studies', text: 'American Studies'},
      {id: 'Animal Sciences', text: 'Animal Sciences'},
      {id: 'Anthropology', text: 'Anthropology'},
      {id: 'Applied Mathematics', text: 'Applied Mathematics'},
      {id: 'Architectural Engineering', text: 'Architectural Engineering'},
      {id: 'Arts', text: 'Arts'},
      {id: 'Astronomy', text: 'Astronomy'},
      {id: 'Asian & Pacific Area Studies', text: 'Asian & Pacific Area Studies'},
      {id: 'Aviation & Air Transportation', text: 'Aviation & Air Transportation'},
      {id: 'Bioengineering', text: 'Bioengineering'},
      {id: 'Biology', text: 'Biology'},
      {id: 'Botany', text: 'Botany '},
      {id: 'Business Administration', text: 'Business Administration'},
      {id: 'Chemistry', text: 'Chemistry'},
      {id: 'Chemical Engineering', text: 'Chemical Engineering'},
      {id: 'Chinese', text: 'Chinese'},
      {id: 'Civil Engineering', text: 'Civil Engineering'},
      {id: 'Classics & Classical Studies', text: 'Classics & Classical Studies'},
      {id: 'Comparative Literature', text: 'Comparative Literature'},
      {id: 'Communication', text: 'Communication'},
      {id: 'Computer Science', text: 'Computer Science'},
      {id: 'Computer & Information Sciences', text: 'Computer & Information Sciences'},
      {id: 'Counseling', text: 'Counseling'},
      {id: 'Crafts & Artisanry', text: 'Crafts & Artisanry'},
      {id: 'Criminal Justice', text: 'Criminal Justice'},
      {id: 'Dance', text: 'Dance'},
      {id: 'Dentistry', text: 'Dentistry'},
      {id: 'Design', text: 'Design'},
      {id: 'Dramatic Arts', text: 'Dramatic Arts'},
      {id: 'Economics', text: 'Economics'},
      {id: 'Education', text: 'Education'},
      {id: 'Film Arts', text: 'Film Arts'},
      {id: 'Finance', text: 'Finance'},
      {id: 'Fine Arts', text: 'Fine Arts'},
      {id: 'Electrical Engineering', text: 'Electrical Engineering'},
      {id: 'Elementary Education', text: 'Elementary Education'},
      {id: 'English', text: 'English'},
      {id: 'English Literature', text: 'English Literature'},
      {id: 'Environmental/Energy Control Tech.', text: 'Environmental/Energy Control Tech.'},
      {id: 'Environmental Sciences', text: 'Environmental Sciences'},
      {id: 'European Studies', text: 'European Studies'},
      {id: 'Foreign Language', text: 'Foreign Language'},
      {id: 'Forestry', text: 'Forestry'},
      {id: 'French', text: 'French'},
      {id: 'German', text: 'German'},
      {id: 'Geography', text: 'Geography'},
      {id: 'Greek', text: 'Greek'},
      {id: 'Health Studies', text: 'Health Studies'},
      {id: 'Hebrew', text: 'Hebrew'},
      {id: 'Hispanic-American Studies', text: 'Hispanic-American Studies'},
      {id: 'History', text: 'History'},
      {id: 'Horticulture', text: 'Horticulture'},
      {id: 'Human Resource Management', text: 'Human Resource Management'},
      {id: 'Humanities', text: 'Humanities'},
      {id: 'Industrial Engineering & Design', text: 'Industrial Engineering & Design'},
      {id: 'Islamic Studies', text: 'Islamic Studies'},
      {id: 'Italian', text: 'Italian'},
      {id: 'Japanese', text: 'Japanese'},
      {id: 'Judaism & Jewish Studies', text: 'Judaism & Jewish Studies'},
      {id: 'Junior Education', text: 'Junior Education'},
      {id: 'Latin', text: 'Latin'},
      {id: 'Latin American Studies', text: 'Latin American Studies'},
      {id: 'Law', text: 'Law'},
      {id: 'Liberal Arts Education', text: 'Liberal Arts Education'},
      {id: 'Library Science', text: 'Library Science'},
      {id: 'Linguistics', text: 'Linguistics'},
      {id: 'Management', text: 'Management'},
      {id: 'Marketing', text: 'Marketing'},
      {id: 'Marine Biology', text: 'Marine Biology'},
      {id: 'Marine Engineering', text: 'Marine Engineering'},
      {id: 'Mathematics', text: 'Mathematics'},
      {id: 'Materials Engineering', text: 'Materials Engineering'},
      {id: 'Mechanical Engineering', text: 'Mechanical Engineering'},
      {id: 'Medicine', text: 'Medicine'},
      {id: 'Meteorology', text: 'Meteorology'},
      {id: 'Microbiology/Bacteriology', text: 'Microbiology/Bacteriology'},
      {id: 'Middle Eastern Studies', text: 'Middle Eastern Studies'},
      {id: 'Mining & Mineral Engineering', text: 'Mining & Mineral Engineering'},
      {id: 'Museums & Preservation', text: 'Museums & Preservation'},
      {id: 'Music', text: 'Music'},
      {id: 'Native American Studies', text: 'Native American Studies'},
      {id: 'Naval Architecture', text: 'Naval Architecture'},
      {id: 'Nuclear Engineering', text: 'Nuclear Engineering'},
      {id: 'Nursing', text: 'Nursing'},
      {id: 'Nutritional Sciences', text: 'Nutritional Sciences'},
      {id: 'Petroleum Engineering', text: 'Petroleum Engineering'},
      {id: 'Philosophy', text: 'Philosophy'},
      {id: 'Physics', text: 'Physics'},
      {id: 'Pharmacy', text: 'Pharmacy'},
      {id: 'Photography', text: 'Photography'},
      {id: 'Political Science', text: 'Political Science'},
      {id: 'Pre-Law', text: 'Pre-Law'},
      {id: 'Pre-School Education', text: 'Pre-School Education'},
      {id: 'Psychology', text: 'Psychology'},
      {id: 'Public Administration', text: 'Public Administration'},
      {id: 'Public Health', text: 'Public Health'},
      {id: 'Religion', text: 'Religion'},
      {id: 'Russian', text: 'Russain'},
      {id: 'Senior High Education', text: 'Senior High Education'},
      {id: 'Social Sciences', text: 'Social Sciences'},
      {id: 'Sociology', text: 'Sociology'},
      {id: 'Software Engineering', text: 'Software Engineering'},
      {id: 'Spanish', text: 'Spanish'},
      {id: 'Special Education', text: 'Special Education'},
      {id: 'Sports, Recreation, & Leisure Studies', text: 'Sports, Recreation, & Leisure Studies'},
      {id: 'Statistics', text: 'Statistics'},
      {id: 'Teacher Education', text: 'Teacher Education'},
      {id: 'Telecommunications', text: 'Telecommunications'},
      {id: 'Theater Arts', text: 'Theater Arts'},
      {id: 'Transportation/Logistics', text: 'Transportation/Logistics'},
      {id: 'Veterinary Sciences', text: 'Veterinary Sciences'},
      {id: 'Visual Arts', text: 'Visual Arts'},
      {id: 'Women\'s Studies', text: 'Women\'s Studies'},
      {id: 'Zoology', text: 'Zoology'}
    ];
  }

  private getFormSelectSetting(): object {
    return {
      degree: {
        title: 'Degree',
        options: this.getDegreeOptions()
      },
      major: {
        title: 'Major',
        options: this.getMajorOptions()
      }
    };
  }

  private buildForm(): FormGroup {
    let education = this.education;

    if (!education) {
      education = {
        institution: '',
        degree: '',
        major: ''
      };
    }

    let gradTimeDefault = null;

    if (education.gradYear && education.gradMonth) {
      let tmpDate = new Date();
      tmpDate.setFullYear(parseInt(education.gradYear, 10));
      tmpDate.setMonth(parseInt(education.gradMonth, 10) - 1);
      gradTimeDefault = tmpDate.toISOString();
    }

    return this.formBuilder.group({
      institution: [education.institution, Validators.compose([
        Validators.required,
        Validators.maxLength(64)
      ])],
      location: [education.location, Validators.maxLength(64)],
      degree: [education.degree, Validators.required],
      major: [education.major, Validators.required],
      gradTime: gradTimeDefault
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
    this.education = this.navParams.get('education');
    this.form = this.buildForm();
    this.formSelectSetting = this.getFormSelectSetting();
  }

  ngOnInit(): void {
    this.campusDesign = this.storageService.get(CAMPUS_DESIGN);
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
          education: ProfileEducation = {
            institution: this.form.value.institution,
            location: this.form.value.location,
            degree: this.form.value.degree,
            major: this.form.value.major,
            gradMonth: '',
            gradYear: ''
          };

      loading.show();

      if (this.form.value.gradTime && typeof this.form.value.gradTime === 'string') {
        [education.gradYear, education.gradMonth] = this.form.value.gradTime.split('-');
      }

      if (!this.navParams.get('education')) {
        this.profileServ
          .addEducation(education)
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
          .editEducation(this.education.id, education)
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
