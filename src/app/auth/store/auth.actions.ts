import { createAction, props } from '@ngrx/store';

import { handleAuthSuccess } from './helpers/handle-auth-success';
import { User } from '../models/user.model';
import { AuthResponse } from '../services/response-models/auth-response';
import { AccessTokenRefreshResponse } from '../services/response-models/access-token-refresh-response';
import { handleAccessTokenRefreshed } from './helpers/handle-access-token-refreshed';
import { UserUpdateResponse } from '../services/response-models/user-update-response';
import { handlePartialUserFromServer } from './helpers/handle-partial-user-from-server';


export const registerNewCompanyAndUser = createAction(
  '[Auth Company Registration Component] Register New Company and User',
  props<{
    companyName: string,
    firstName: string,
    lastName: string,
    email: string,
    jobTitle: string,
    password: string,
    passwordConfirmation: string
  }>()
);

export const newCompanyAndUserRegistered = createAction(
  '[Auth Company And User Registration Effect] New Company And User Registered',
  (response: AuthResponse): { user: User } => handleAuthSuccess(response)
);

export const validateInvitationToken = createAction(
  '[Is Invited Guard] Validate Invitation Token',
  props<{ invitationToken: string }>()
);

export const invitationTokenValidated = createAction(
  '[Auth Validate Invitation Token Effect] Invitation Token Validated',
  props<{ invitationTokenValid: boolean }>()
);

export const invalidateInvitationToken = createAction(
  '[Is Invited Guard] Invalidate Invitation Token',
);

export const registerUserWithInvitationToken = createAction(
  '[Invitation Based Registration Component] Register User With Invitation Token',
  props<{
    invitationToken: string,
    firstName: string,
    lastName: string,
    email: string,
    jobTitle: string,
    password: string,
    passwordConfirmation: string
  }>()
);

export const userWithInvitationTokenRegistered = createAction(
  '[Auth User With Invitation Token Registration Effect] User With Invitation Token Registered',
  (response: AuthResponse): { user: User } => handleAuthSuccess(response)
);

export const logUserIn = createAction(
  '[Auth Login Component] Log User In',
  props<{ email: string, password: string }>()
);

export const userLoggedIn = createAction(
  '[Auth Login Effect] User Logged In',
  (response: AuthResponse): { user: User } => handleAuthSuccess(response)
);

export const automaticallyLogUserIn = createAction(
  '[App Component OnInit] Automatically Log User In',
  props<{ user: User }>()
);

export const refreshAccessToken = createAction(
  '[Access Token Refresh Interceptor] Refresh Access Token',
  props<{ refreshToken: string }>()
);

export const accessTokenRefreshed = createAction(
  '[Auth Access Token Refresh Effect] Access Token Refreshed',
  (
    response: AccessTokenRefreshResponse
  ): { accessToken: string, accessTokenExpirationDate: string } =>
    handleAccessTokenRefreshed(response)
);

export const logUserOut = createAction(
  '[Main Navbar Top Component] Log User Out'
);

export const cleanUpAfterLogout = createAction(
  '[Auth Logout Effect] Clean up After Logout'
);

export const confirmUserEmail = createAction(
  '[Auth Email Confirmation Component or Login Effect] Confirm User Email',
  props<{ emailConfirmationToken: string }>()
);

export const userEmailConfirmed = createAction(
  '[Auth Confirm User Email Effect] User Email Confirmed'
);

export const sendPasswordResetEmail = createAction(
  '[Auth Forgot Password Component] Send Password Reset Email',
  props<{ email: string }>()
);

export const validatePasswordResetToken = createAction(
  '[Password Reset Guard] Validate Password Reset Token ',
  props<{ resetToken: string }>()
);

export const passwordResetTokenValidated = createAction(
  '[Auth Validate Password Reset Token Effect] Password Reset Token Validated',
  props<{ resetTokenValid: boolean }>()
);

export const invalidatePasswordResetToken = createAction(
  '[Password Reset Guard] Invalidate Password Reset Token',
);

export const resetUserPassword = createAction(
  '[Auth Reset Password Component] Reset User Password',
  props<{
    password: string,
    passwordConfirmation: string,
    resetToken: string
  }>()
);

export const userPasswordResetSuccessful = createAction(
  '[Auth Reset User Password Effect] User Password Reset Successful',
  (response: AuthResponse): { user: User } => handleAuthSuccess(response)
);

export const updateUserPassword = createAction(
  '[User Profile Main Component] Update User Password',
  props<{ currentPassword: string, newPassword: string, passwordConfirm: string }>()
);

export const userPasswordUpdated = createAction(
  '[Update User Password Effect] User Password Updated',
  (response: AuthResponse): { user: User } => handleAuthSuccess(response)
);

export const updateUser = createAction(
  '[User Profile Main Component] Update User',
  props<{ email: string, firstName: string, lastName: string, jobTitle: string }>()
);

export const userUpdated = createAction(
  '[Update User Effect] User Updated',
  (
    response: UserUpdateResponse
  ): { user: Partial<User> } => handlePartialUserFromServer(response)
);

export const cancelUsersCompanyMembership = createAction(
  `[User Profile Main Component] Cancel User's Company Membership`
);




