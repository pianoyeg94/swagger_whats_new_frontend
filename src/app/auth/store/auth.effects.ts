import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap, delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as fromApp from '../../store/app.reducer';
import { AppActions } from '../../store/action-types';
import { AuthActions } from './action-types';
import { RegistrationHttpService } from '../services/registration-http.service';
import { LoginHttpService } from '../services/login-http.service';
import { AuthRelatedHttpService } from '../services/auth-related-http.service';
import { triggerUserEmailConfirmation } from './helpers/trigger-user-email-confirmation';
import { observableResponseErrorWrapper } from '../../utils/response-error-wrapper';
import { User } from '../models/user.model';
import {
  localStorageGetDecryptedObject,
  localStorageSetEncryptedObject
} from '../../utils/local-storage-encryption';
import {MainActions} from '../../main/store/main/action-types';


@Injectable()
export class AuthEffects {

  companyAndUserRegistration$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.registerNewCompanyAndUser),
    concatMap(action => this.registrationHttpService.registerCompanyAndUser(
      action.companyName,
      action.firstName,
      action.lastName,
      action.email,
      action.jobTitle,
      action.password,
      action.passwordConfirmation
    ).pipe(
      switchMap(response => [
        AuthActions.newCompanyAndUserRegistered(response),
        MainActions.notifyUserIsAfterCompanyRegistration()
      ]),
      catchError(() => of(AppActions.toastErrorTopRight('An unknown error occurred')))
    ))
  ));

  validateInvitationToken$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.validateInvitationToken),
    concatMap(action => this.registrationHttpService.validateInvitationToken(
      action.invitationToken
    ).pipe(
      map(response => AuthActions.invitationTokenValidated({
        invitationTokenValid: response.company_invitation_token_valid
      })),
      catchError(() => of(AuthActions.invitationTokenValidated({ invitationTokenValid: false })))
    ))
  ));

  userWithInvitationTokenRegistration$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.registerUserWithInvitationToken),
    concatMap(action => this.registrationHttpService.registerUserWithInvitationToken(
      action.invitationToken,
      action.firstName,
      action.lastName,
      action.email,
      action.jobTitle,
      action.password,
      action.passwordConfirmation
    ).pipe(
      map(response => AuthActions.userWithInvitationTokenRegistered(response)),
      catchError(error => observableResponseErrorWrapper(
        AppActions.toastErrorTopCenter,
        error,
        ['error', 'message', 'non_field_errors', 0],
        'Invitation is invalid or has expired'
      ))
    ))
  ));

  login$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logUserIn),
    concatMap(action => this.loginHttpService.login(
      action.email,
      action.password
    ).pipe(
      switchMap(response => [
        AuthActions.userLoggedIn(response),
        triggerUserEmailConfirmation()
      ]),
      catchError(error => observableResponseErrorWrapper(
        AppActions.toastErrorTopCenter,
        error,
        ['error', 'message', 'detail'],
        'Invalid email or password'
      ))
    ))
  ));

  accessTokenRefresh$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.refreshAccessToken),
    concatMap(action => this.loginHttpService.refreshAccessToken(
      action.refreshToken
    ).pipe(
      map(response => AuthActions.accessTokenRefreshed(response)),
      catchError(() => of(AuthActions.logUserOut()))
    ))
  ));

  logout$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.logUserOut),
    tap(() => localStorage.removeItem('userData')),
    tap(() => this.router.navigateByUrl('login')),
    delay(0), // wait for the currently active component to be destroyed
    map(() => AuthActions.cleanUpAfterLogout())
  ));

  confirmUserEmail$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.confirmUserEmail),
    concatMap(action => this.registrationHttpService.confirmUserEmail(
      action.emailConfirmationToken
    ).pipe(
      switchMap(() => {
        const user = localStorageGetDecryptedObject<User>('userData');
        user.emailConfirmed = true;
        localStorageSetEncryptedObject('userData', user);
        return [
          AuthActions.userEmailConfirmed(),
          AppActions.toastSuccessTopRight('Email confirmed successfully')
        ];
      }),
      catchError(error => observableResponseErrorWrapper(
        AppActions.toastErrorTopRight,
        error,
        ['error', 'message', 'non_field_errors', 0],
        'Email confirmation token is invalid or email already confirmed'
      ))
    ))
  ));

  sendPasswordResetEmail$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.sendPasswordResetEmail),
    concatMap(action => this.authRelatedHttpService.sendPasswordResetEmail(action.email))
  ), { dispatch: false });

  validatePasswordResetToken$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.validatePasswordResetToken),
    concatMap(action => this.authRelatedHttpService.validateResetToken(
      action.resetToken
    ).pipe(
      map(response => AuthActions.passwordResetTokenValidated({
        resetTokenValid: response.password_reset_token_valid
      })),
      catchError(() => of(AuthActions.passwordResetTokenValidated({ resetTokenValid: false })))
    ))
  ));

  resetUserPassword$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.resetUserPassword),
    concatMap(action => this.authRelatedHttpService.resetUserPassword(
      action.password,
      action.passwordConfirmation,
      action.resetToken
    ).pipe(
      map(response => AuthActions.userPasswordResetSuccessful(response)),
      catchError(() => of(AppActions.toastErrorTopRight('An unknown error occurred')))
    ))
  ));

  updateUserPassword$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.updateUserPassword),
    concatMap(action => this.authRelatedHttpService.updateUserPassword(
      action.currentPassword,
      action.newPassword,
      action.passwordConfirm
    ).pipe(
      switchMap(response => [
        AuthActions.userPasswordUpdated(response),
        AppActions.toastSuccessTopRight('Password changed successfully')
      ]),
      catchError(error => observableResponseErrorWrapper(
        AppActions.toastErrorTopRight,
        error,
        ['error', 'message', 'current_password', 0],
        'Invalid current password'
      ))
    ))
  ));

  updateUser$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.updateUser),
    concatMap(action => this.authRelatedHttpService.updateUser(
      action.email,
      action.firstName,
      action.lastName,
      action.jobTitle
    ).pipe(
      switchMap(response => [
        AuthActions.userUpdated(response),
        AppActions.toastSuccessTopRight('Account settings updated successfully')
      ]),
      catchError(() => of(AppActions.toastErrorTopRight('An unknown error occurred')))
    ))
  ));

  cancelUsersCompanyMembership$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.cancelUsersCompanyMembership),
    tap(() => this.store.dispatch(AppActions.appNavigationStart())),
    concatMap(() => this.authRelatedHttpService.cancelUsersCompanyMembership()),
    tap(() => this.store.dispatch(AuthActions.logUserOut())),
    tap(() => this.store.dispatch(AppActions.appNavigationEnd())),
  ), { dispatch: false });

  redirectOnAuthSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(
      AuthActions.userLoggedIn,
      AuthActions.userWithInvitationTokenRegistered,
      AuthActions.userPasswordResetSuccessful
    ),
    tap(() => this.router.navigateByUrl('/swagger-projects'))
  ), { dispatch: false });

  redirectOnCompanyRegistrationSuccess$ = createEffect(() => this.actions$.pipe(
    ofType(AuthActions.newCompanyAndUserRegistered),
    tap(() => this.router.navigateByUrl('/confirm-email-info'))
  ), { dispatch: false });

  constructor(
    private router: Router,
    private actions$: Actions,
    private registrationHttpService: RegistrationHttpService,
    private loginHttpService: LoginHttpService,
    private authRelatedHttpService: AuthRelatedHttpService,
    private store: Store<fromApp.AppState>
  ) {}
}

