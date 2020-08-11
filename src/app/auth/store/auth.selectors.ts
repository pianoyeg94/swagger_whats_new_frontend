import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromAuth from './auth.reducer';

export const selectAuthState =
  createFeatureSelector<fromAuth.AuthState>('auth');

export const selectUser = createSelector(
  selectAuthState,
  state => state.user
);

export const selectTokenRefreshInProgress = createSelector(
  selectAuthState,
  state => state.tokenRefreshInProgress
);

export const selectInvitationToken = createSelector(
  selectAuthState,
  state => state.invitationToken
);

export const selectInvitationTokenValidationInProgress = createSelector(
  selectInvitationToken,
  invitationToken => invitationToken.invitationTokenValidationInProgress
);

export const selectResetToken = createSelector(
  selectAuthState,
  state => state.resetToken
);

export const selectResetTokenValidationInProgress = createSelector(
  selectResetToken,
  resetToken => resetToken.resetTokenValidationInProgress
);



