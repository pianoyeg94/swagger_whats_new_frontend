import { createReducer, on } from '@ngrx/store';

import { UserProfile } from '../../models/user-profile.model';
import { UserProfileActions } from './action-types';
import { AuthActions } from '../../../auth/store/action-types';


export interface UserProfileState {
  userProfile: UserProfile;
}

export const initialUserProfileState = {
  userProfile: null
};

export const userProfileReducer = createReducer(
  initialUserProfileState,
  on(
    UserProfileActions.userProfileLoaded,
    UserProfileActions.userProfileUpdated,
    (state, { userProfile }) => ({
      ...state,
      userProfile
    })
  ),
  on(UserProfileActions.userProfilePhotoUploaded, (state, { profilePhotoUrl }) => ({
    ...state,
    userProfile: {
      ...state.userProfile,
      profilePhotoUrl
    }
  })),
  on(AuthActions.cleanUpAfterLogout, state => ({
    ...state,
    userProfile: null
  }))
);

