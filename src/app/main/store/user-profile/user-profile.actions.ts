import { createAction, props } from '@ngrx/store';

import { handleUserProfileFromServer } from './helpers/handle-user-profile-from-server';
import { UserProfileResponse } from '../../services/response-models/user-profile-response';
import { UserProfile } from '../../models/user-profile.model';

export const loadUserProfile = createAction(
  '[User Profile Resolver] Load User Profile'
);

export const userProfileLoaded = createAction(
  '[Load User Profile Effect] User Profile Loaded',
  (
    response: UserProfileResponse
  ): { userProfile: UserProfile } => handleUserProfileFromServer(response)
);

export const updateUserProfile = createAction(
  '[User Profile Main Component] Update User Profile',
  props<{ skype: string, phoneNumber: string }>()
);

export const userProfileUpdated = createAction(
  '[Update User Profile Effect] User Profile Updated',
  (
    response: UserProfileResponse
  ): { userProfile: UserProfile } => handleUserProfileFromServer(response)
);

export const uploadUserProfilePhoto = createAction(
  '[User Profile Main Component] Upload User Profile Photo',
  props<{ selectedFile: File, selectedFileName: string }>()
);

export const userProfilePhotoUploaded = createAction(
  '[Upload User Profile Photo Effect] User Profile Photo Uploaded',
  props<{ profilePhotoUrl: string }>()
);

