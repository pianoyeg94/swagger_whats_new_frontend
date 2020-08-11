import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, of } from 'rxjs';
import { catchError, concatMap, delay, map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { VCSAccountsHttpService } from '../../services/vcs-accounts-http.service';
import * as fromApp from '../../../store/app.reducer';
import { RemoteVCSAccountsActions } from './action-types';
import { AppActions } from '../../../store/action-types';


@Injectable()
export class VCSAccountsEffects {

  loadVCSAccounts$ = createEffect(() => this.actions$.pipe(
    ofType(
      RemoteVCSAccountsActions.loadVCSAccounts,
      RemoteVCSAccountsActions.loadVCSAccountsForSwaggerProject
    ),
    concatMap(() => this.vcsAccountsHttpService.loadVCSAccounts().pipe(
      map(response => RemoteVCSAccountsActions.vcsAccountsLoaded(response)),
      catchError(() => of(AppActions.toastErrorTopRight('An unknown error occurred')))
    ))
  ));

  loadVCSAccount$ = createEffect(() => this.actions$.pipe(
    ofType(RemoteVCSAccountsActions.loadVcsAccount),
    concatMap(action => this.vcsAccountsHttpService.loadVCSAccount(
      action.vcsAccountId
    ).pipe(
      map(response => RemoteVCSAccountsActions.vcsAccountLoaded(response)),
      catchError(error => error.status === 404
        ? of(RemoteVCSAccountsActions.errorLoadingVCSAccount())
        : from([
          RemoteVCSAccountsActions.errorLoadingVCSAccount(),
          AppActions.toastErrorTopRight('An unknown error occurred')
        ])
      )
    ))
  ));

  registerVCSAccount$ = createEffect(() => this.actions$.pipe(
    ofType(RemoteVCSAccountsActions.registerVCSAccount),
    delay(0),
    tap(() => this.store.dispatch(AppActions.appNavigationStart())),
    concatMap(action => this.vcsAccountsHttpService.registerVCSAccount(
      action.remoteVCSAccount
    ).pipe(
      switchMap(response => [
        RemoteVCSAccountsActions.vcsAccountRegistered(response),
        AppActions.toastSuccessTopRight('VCS account successfully registered'),
        AppActions.appNavigationEnd()
      ]),
      catchError(() => from([
        AppActions.toastErrorTopRight('An unknown error occurred'),
        RemoteVCSAccountsActions.errorRegisteringVCSAccount(),
        AppActions.appNavigationEnd()
      ]))
    ))
  ));

  deleteVCSAccount$ = createEffect(() => this.actions$.pipe(
    ofType(RemoteVCSAccountsActions.deleteVCSAccount),
    concatMap(action => this.vcsAccountsHttpService.deleteVCSAccount((action.vcsAccountId)).pipe(
      map(() => AppActions.toastSuccessTopRight('VCS account deleted successfully')),
      catchError(() => of(AppActions.toastErrorTopRight('An unknown error occurred')))
    ))
  ));

  redirectToMainVCSAccountsPage$ = createEffect(() => this.actions$.pipe(
    ofType(
      RemoteVCSAccountsActions.vcsAccountRegistered,
      RemoteVCSAccountsActions.errorLoadingVCSAccount,
      RemoteVCSAccountsActions.errorRegisteringVCSAccount
    ),
    tap(() => this.router.navigateByUrl('/vcs-accounts'))
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private vcsAccountsHttpService: VCSAccountsHttpService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}
}

