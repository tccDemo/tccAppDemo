import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';

import { Profile } from './profile.interface';
import { ProfileEducation } from './profile-education.interface';
import { ProfileWorkExperience } from './profile-work-experience.interface';
import { CampusInfo } from '../campusInfo';
import { UserInfo } from '../userInfo';

import { ResourceService } from '../resource/resource.service';

import { UtilLogService } from '../util/util-log.service';
import { IS_USING_REAL_DATA } from '../tcc.service';
import { StorageService, USER_INFO, CAMPUS_INFO } from '../storage.service';

import { PROFILE_MOCK } from './profile-mock';
import { PROFILE_EDUCATION_LIST_MOCK } from './profile-education-list-mock';
import { PROFILE_WORK_EXPERIENCE_LIST_MOCK } from './profile-work-experience-list-mock';

@Injectable()
export class ProfileService {

  private getResourceUrl(): string {
    let campusInfo: CampusInfo = this.storageServ.get(CAMPUS_INFO);

    return `tcc_profile/22.${campusInfo.campusId}/`;
  }

  constructor(
    private file: File,
    private resourceServ: ResourceService,
    private storageServ: StorageService,
    private utilLogServ: UtilLogService
  ) {}

  public getProfile(): Promise<Profile> {
    let url = `${this.getResourceUrl()}Profile`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .getWithAuthentication(url)
          .then((response) => {
            this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'ProfileService', 'getProfile');
            reslove(response);
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'ProfileService', 'getProfile');
            reject('Unable to get profile data');
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'ProfileService', 'getProfile');
          reslove(PROFILE_MOCK);
        }, 1000);
      }
    });
  }

  public editProfile(userProfile: Profile): Promise<any> {
    let url = `${this.getResourceUrl()}Profile`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .putWithAuthentication(url, {
            homeRegion: userProfile.homeRegion,
            language: userProfile.language,
            interest: userProfile.interest,
            research: userProfile.research
          })
          .then((response) => {
            this.utilLogServ.log(`Put resource "${url}" success`, {userProfile: userProfile}, 'ProfileService', 'editProfile');
            reslove(response);
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to put resource, url: "${url}"`, {userProfile: userProfile}, 'ProfileService', 'editProfile');
            reject('Unable to edit profile data');
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Put resource "${url}" use fake data`, {userProfile: userProfile}, 'ProfileService', 'editProfile');
          reslove();
        }, 1000);
      }
    });
  }

  public getEducationList(): Promise<ProfileEducation[]> {
    let url = `${this.getResourceUrl()}Education`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .getWithAuthentication(url)
          .then((response) => {
            this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'ProfileService', 'getEducationList');
            reslove(response);
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'ProfileService', 'getEducationList');
            reject('Unable to get education list');
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'ProfileService', 'getEducationList');
          reslove(PROFILE_EDUCATION_LIST_MOCK);
        }, 1000);
      }
    });
  }

  public addEducation(profileEducation: ProfileEducation): Promise<any> {
    let url = `${this.getResourceUrl()}Education`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .postWithAuthentication(url, {
            institution: profileEducation.institution,
            location: profileEducation.location,
            degree: profileEducation.degree,
            major: profileEducation.major,
            gradMonth: profileEducation.gradMonth,
            gradYear: profileEducation.gradYear
          })
          .then((response) => {
            this.utilLogServ.log(`Post resource "${url}" success`, {profileEducation: profileEducation}, 'ProfileService', 'addEducation');
            reslove(response);
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to post resource, url: "${url}"`, {profileEducation: profileEducation}, 'ProfileService', 'addEducation');
            reject('Unable to add education');
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Post resource "${url}" use fake data`, {profileEducation: profileEducation}, 'ProfileService', 'addEducation');
          reslove();
        }, 1000);
      }
    });
  }

  public editEducation(id: string, profileEducation: ProfileEducation): Promise<any> {
    let url = `${this.getResourceUrl()}Education/${id}`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .putWithAuthentication(url, {
            institution: profileEducation.institution,
            location: profileEducation.location,
            degree: profileEducation.degree,
            major: profileEducation.major,
            gradMonth: profileEducation.gradMonth,
            gradYear: profileEducation.gradYear
          })
          .then((response) => {
            this.utilLogServ.log(`Put resource "${url}" success`, {
              id: id,
              profileEducation: profileEducation
            }, 'ProfileService', 'editEducation');
            reslove(response);
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to put resource, url: "${url}"`, {
              id: id,
              profileEducation: profileEducation
            }, 'ProfileService', 'editEducation');
            reject('Unable to edit education');
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Put resource "${url}" use fake data`, {
            id: id,
            profileEducation: profileEducation
          }, 'ProfileService', 'addEducation');
          reslove();
        }, 1000);
      }
    });
  }

  public removeEducation(id: string): Promise<any> {
    let url = `${this.getResourceUrl()}Education/${id}`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .deleteWithAuthentication(url)
          .then((response) => {
            this.utilLogServ.log(`Delete resource "${url}" success`, {id: id}, 'ProfileService', 'removeEducation');
            reslove();
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to delete resource, url: "${url}"`, {id: id}, 'ProfileService', 'removeEducation');
            reject('Unable to remove education');
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Delete resource "${url}" use fake data`, {id: id}, 'ProfileService', 'removeEducation');

          reslove();
        }, 1000);
      }
    });
  }

  public getWorkExperienceList(): Promise<ProfileWorkExperience[]> {
    let url = `${this.getResourceUrl()}WorkExperience`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .getWithAuthentication(url)
          .then((response) => {
            this.utilLogServ.log(`Get resource "${url}" success`, undefined, 'ProfileService', 'getWorkExperienceList');
            reslove(response);
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to get resource, url: "${url}"`, undefined, 'ProfileService', 'getWorkExperienceList');
            reject('Unable to get work experience list');
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Get resource "${url}" use fake data`, undefined, 'ProfileService', 'getWorkExperienceList');
          reslove(PROFILE_WORK_EXPERIENCE_LIST_MOCK);
        }, 1000);
      }
    });
  }

  public addWorkExperience(profileWorkExperience: ProfileWorkExperience): Promise<any> {
    let url = `${this.getResourceUrl()}WorkExperience`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .postWithAuthentication(url, {
            company: profileWorkExperience.company,
            location: profileWorkExperience.location,
            industry: profileWorkExperience.industry,
            title: profileWorkExperience.title,
            duty: profileWorkExperience.duty,
            beginMonth: profileWorkExperience.beginMonth,
            beginYear: profileWorkExperience.beginYear,
            endMonth: profileWorkExperience.endMonth,
            endYear: profileWorkExperience.endYear
          })
          .then((response) => {
            this.utilLogServ.log(`Post resource "${url}" success`, {profileWorkExperience: profileWorkExperience}, 'ProfileService', 'addWorkExperience');
            reslove(response);
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to post resource, url: "${url}"`, {profileWorkExperience: profileWorkExperience}, 'ProfileService', 'addWorkExperience');
            reject('Unable to add work experience');
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Post resource "${url}" use fake data`, {profileWorkExperience: profileWorkExperience}, 'ProfileService', 'addWorkExperience');
          reslove();
        }, 1000);
      }
    });
  }

  public editWorkExperience(id: string, profileWorkExperience: ProfileWorkExperience): Promise<any> {
    let url = `${this.getResourceUrl()}WorkExperience/${id}`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .putWithAuthentication(url, {
            company: profileWorkExperience.company,
            location: profileWorkExperience.location,
            industry: profileWorkExperience.industry,
            title: profileWorkExperience.title,
            duty: profileWorkExperience.duty,
            beginMonth: profileWorkExperience.beginMonth,
            beginYear: profileWorkExperience.beginYear,
            endMonth: profileWorkExperience.endMonth,
            endYear: profileWorkExperience.endYear
          })
          .then((response) => {
            this.utilLogServ.log(`Put resource "${url}" success`, {
              id: id,
              profileWorkExperience: profileWorkExperience
            }, 'ProfileService', 'editWorkExperience');
            reslove(response);
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to put resource, url: "${url}"`, {
              id: id,
              profileWorkExperience: profileWorkExperience
            }, 'ProfileService', 'editWorkExperience');
            reject('Unable to edit work experience');
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Put resource "${url}" use fake data`, {
            id: id,
            profileWorkExperience: profileWorkExperience
          }, 'ProfileService', 'editWorkExperience');
          reslove();
        }, 1000);
      }
    });
  }

  public removeWorkExperience(id: string): Promise<any> {
    let url = `${this.getResourceUrl()}WorkExperience/${id}`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .deleteWithAuthentication(url)
          .then((response) => {
            this.utilLogServ.log(`Delete resource "${url}" success`, {id: id}, 'ProfileService', 'removeWorkExperience');
            reslove();
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to delete resource, url: "${url}"`, {id: id}, 'ProfileService', 'removeWorkExperience');
            reject('Unable to remove work experience');
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Delete resource "${url}" use fake data`, {id: id}, 'ProfileService', 'removeWorkExperience');

          reslove();
        }, 1000);
      }
    });
  }

  public uploadAvatar(source: string): Promise<any> {
    let url = `${this.getResourceUrl()}Avatar`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .uploadFileWithAuthentication(source, url, 'upfile', 'avatar.jpg')
          .then((response) => {
            this.utilLogServ.log(`Upload file to "${url}" success`, {source: source}, 'ProfileService', 'uploadAvatar');
            reslove();
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to upload file, url: "${url}"`, {source: source}, 'ProfileService', 'uploadAvatar');
            reject('Unable to upload user avatar');
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Upload file to "${url}" use fake data`, {
            source: source
          }, 'ProfileService', 'uploadAvatar');

          reslove();
        }, 1000);
      }
    });
  }

  public downloadAvatar(): Promise<string>{
    let url = `${this.getResourceUrl()}Avatar`,
        userInfo: UserInfo = this.storageServ.get(USER_INFO),
        userAvatarPath: string = `${this.file.dataDirectory}${userInfo.userId}_avatar.jpg`;

    return new Promise((reslove, reject) => {
      if (IS_USING_REAL_DATA) {
        this.resourceServ
          .downloadFileWithAuthentication(url, userAvatarPath)
          .then((response) => {
            this.utilLogServ.log(`Download file from "${url}" success`, {userAvatarPath: userAvatarPath}, 'ProfileService', 'downloadAvatar');
            reslove(userAvatarPath);
          })
          .catch((error) => {
            this.utilLogServ.warn(`Unable to download file, url: "${url}"`, {userAvatarPath: userAvatarPath}, 'ProfileService', 'downloadAvatar');
            reject('Unable to download user avatar');
          });
      } else {
        setTimeout(() => {
          this.utilLogServ.log(`Download file from "${url}" use fake data`, undefined, 'ProfileService', 'downloadAvatar');

          reslove();
        }, 1000);
      }
    });
  }
}