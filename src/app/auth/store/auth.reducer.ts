import { createReducer, on } from '@ngrx/store';

import { AuthActions } from './action-types';
import { User } from '../models/user.model';


export interface AuthState {
  user: User;
  tokenRefreshInProgress: boolean;
  resetToken: {
    resetTokenValidationInProgress: boolean;
    resetTokenValid: boolean;
  };
  invitationToken: {
    invitationTokenValidationInProgress: boolean;
    invitationTokenValid: boolean;
  };
}

export const initialAuthState: AuthState = {
  user: null,
  tokenRefreshInProgress: false,
  resetToken: {
    resetTokenValidationInProgress: false,
    resetTokenValid: false
  },
  invitationToken: {
    invitationTokenValidationInProgress: false,
    invitationTokenValid: false
  }
};

export const authReducer = createReducer(
  initialAuthState,
  on(
    AuthActions.newCompanyAndUserRegistered,
    AuthActions.userWithInvitationTokenRegistered,
    AuthActions.userLoggedIn,
    AuthActions.automaticallyLogUserIn,
    AuthActions.userPasswordResetSuccessful,
    AuthActions.userPasswordUpdated,
    (state, { user }) => ({
      ...state,
      user
    })
  ),
  on(AuthActions.validateInvitationToken, state => ({
    ...state,
    invitationToken: {
      ...state.invitationToken,
      invitationTokenValidationInProgress: true
    }
  })),
  on(AuthActions.invitationTokenValidated, (state, { invitationTokenValid }) => ({
    ...state,
    invitationToken: {
      ...state.invitationToken,
      invitationTokenValid,
      invitationTokenValidationInProgress: false
    }
  })),
  on(AuthActions.invalidateInvitationToken, state => ({
    ...state,
    invitationToken: {
      ...state.invitationToken,
      invitationTokenValid: false
    }
  })),
  on(AuthActions.refreshAccessToken, state => ({
    ...state,
    tokenRefreshInProgress: true
  })),
  on(AuthActions.accessTokenRefreshed, (state, { accessToken, accessTokenExpirationDate }) => ({
    ...state,
    tokenRefreshInProgress: false,
    user: {
      ...state.user,
      accessToken,
      accessTokenExpirationDate
    }
  })),
  on(AuthActions.validatePasswordResetToken, state => ({
    ...state,
    resetToken: {
      ...state.resetToken,
      resetTokenValidationInProgress: true
    }
  })),
  on(AuthActions.passwordResetTokenValidated, (state, { resetTokenValid }) => ({
    ...state,
    resetToken: {
      ...state.resetToken,
      resetTokenValid,
      resetTokenValidationInProgress: false
    }
  })),
  on(AuthActions.invalidatePasswordResetToken, state => ({
    ...state,
    resetToken: {
      ...state.resetToken,
      resetTokenValid: false
    }
  })),
  on(AuthActions.userEmailConfirmed, state => ({
    ...state,
    user: {
      ...state.user,
      emailConfirmed: true
    }
  })),
  on(AuthActions.userUpdated, (state, { user }) => ({
    ...state,
    user: {
      ...state.user,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      jobTitle: user.jobTitle,
      emailConfirmed: user.emailConfirmed
    }
  })),
  on(AuthActions.logUserOut, state => ({
    ...state,
    user: null,
  })),
  on(AuthActions.cleanUpAfterLogout, state => ({
    ...state
  })),
);

