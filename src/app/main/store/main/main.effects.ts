import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { MainHttpService } from '../../services/main-http.service';
import { MainActions } from './action-types';
import { AppActions } from '../../../store/action-types';


@Injectable()
export class MainEffects {

  loadCompanyMembershipPermissions$ = createEffect(() => this.actions$.pipe(
    ofType(MainActions.loadCompanyMembershipPermissions),
    concatMap(() => this.mainHttpService.loadCompanyMembershipPermissions().pipe(
      map(response => MainActions.companyMembershipPermissionsLoaded(response)),
      catchError(() => of(AppActions.toastErrorTopRight('An unknown error occurred')))
    ))
  ));

  constructor(
    private actions$: Actions,
    private mainHttpService: MainHttpService
  ) {}
}

