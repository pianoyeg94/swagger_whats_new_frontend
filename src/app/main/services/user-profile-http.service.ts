import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { UserProfileResponse } from './response-models/user-profile-response';


@Injectable({ providedIn: 'root' })
export class UserProfileHttpService {

  constructor(private http: HttpClient) {}

  loadUserProfile() {
    return this.http.get<UserProfileResponse>(`${environment.apiUrl}/me/profile/`);
  }

  updateUserProfile(skype: string, phoneNumber: string) {
    return this.http.put<UserProfileResponse>(
      `${environment.apiUrl}/me/profile/`,
      { skype, phone_number: phoneNumber }
    );
  }

  uploadUserProfilePhoto(selectedFile: File, selectFileName: string) {
    const uploadData = new FormData();
    uploadData.append('profile_photo', selectedFile, selectFileName);
    return this.http.put<{ profile_photo: string }>(
      `${environment.apiUrl}/me/profile-photo/`,
      uploadData
    );
  }
}
