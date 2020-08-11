import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromUserProfile from './user-profile.reducer';


export const selectUserProfileState =
  createFeatureSelector<fromUserProfile.UserProfileState>('userProfile');

export const selectUserProfile = createSelector(
  selectUserProfileState,
  state => state.userProfile
);
