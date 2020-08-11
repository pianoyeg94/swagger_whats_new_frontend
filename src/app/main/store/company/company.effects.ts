import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { CompanyHttpService } from '../../services/company-http.service';
import * as fromApp from '../../../store/app.reducer';
import { AppActions } from '../../../store/action-types';
import { CompanyActions } from './action-types';
import { AuthActions } from '../../../auth/store/action-types';


@Injectable()
export class CompanyEffects {

  loadCompanyDetails$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyActions.loadCompanyDetails),
    concatMap(() => this.companyHttpService.loadCompany().pipe(
      map(response => CompanyActions.companyDetailsLoaded(response)),
      catchError(() => of(AppActions.toastErrorTopRight('An unknown error occurred')))
    ))
  ));

  updateCompanyDetails$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyActions.updateCompanyDetails),
    concatMap(action => this.companyHttpService.updateCompanyDetails(
      action.companyName
    ).pipe(
      switchMap(response => [
        CompanyActions.companyDetailsUpdated(response),
        AppActions.toastSuccessTopRight('Company updated successfully')
      ]),
      catchError(() => of(AppActions.toastErrorTopRight('An unknown error occurred')))
    ))
  ));

  deleteCompany$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyActions.deleteCompany),
    tap(() => this.store.dispatch(AppActions.appNavigationStart())),
    concatMap(() => this.companyHttpService.deleteCompany()),
    tap(() => this.store.dispatch(AuthActions.logUserOut())),
    tap(() => this.store.dispatch(AppActions.appNavigationEnd())),
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private companyHttpService: CompanyHttpService,
    private store: Store<fromApp.AppState>
  ) {}
}
