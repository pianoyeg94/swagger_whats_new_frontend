import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { observableResponseErrorWrapper } from '../../../utils/response-error-wrapper';
import { UserProfileHttpService } from '../../services/user-profile-http.service';
import { AppActions } from '../../../store/action-types';
import { UserProfileActions } from './action-types';


@Injectable()
export class UserProfileEffects {

  loadUserProfile$ = createEffect(() => this.actions$.pipe(
    ofType(UserProfileActions.loadUserProfile),
    concatMap(() => this.userProfileHttpService.loadUserProfile().pipe(
      map(response => UserProfileActions.userProfileLoaded(response)),
      catchError(() => of(AppActions.toastErrorTopRight('An unknown error occurred')))
    ))
  ));

  updateUserProfile$ = createEffect(() => this.actions$.pipe(
    ofType(UserProfileActions.updateUserProfile),
    concatMap(action => this.userProfileHttpService.updateUserProfile(
      action.skype,
      action.phoneNumber
    ).pipe(
      switchMap(response => [
        UserProfileActions.userProfileUpdated(response),
        AppActions.toastSuccessTopRight('Profile updated successfully')
      ]),
      catchError(() => of(AppActions.toastErrorTopRight('An unknown error occurred')))
    ))
  ));

  uploadUserProfilePhoto$ = createEffect(() => this.actions$.pipe(
    ofType(UserProfileActions.uploadUserProfilePhoto),
    concatMap(action => this.userProfileHttpService.uploadUserProfilePhoto(
      action.selectedFile,
      action.selectedFileName
    ).pipe(
      switchMap(response => [
        UserProfileActions.userProfilePhotoUploaded({
          profilePhotoUrl: response.profile_photo
        }),
        AppActions.toastSuccessTopRight('Photo uploaded successfully')
      ]),
      catchError(error => observableResponseErrorWrapper(
        AppActions.toastErrorTopRight,
        error,
        ['error', 'message', 'profile_photo', 0],
        'Invalid file format'
      ))
    ))
  ));

  constructor(
    private actions$: Actions,
    private userProfileHttpService: UserProfileHttpService
  ) {}
}
