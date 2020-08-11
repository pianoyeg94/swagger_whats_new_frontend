import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import { RemoteVCSAccountsActions } from '../../store/vcs-accounts/action-types';
import { selectAreVCSAccountsLoaded } from '../../store/vcs-accounts/vcs-accounts.selectors';


@Injectable({ providedIn: 'root' })
export class VCSAccountsResolver implements Resolve<any> {

  constructor(private store: Store<fromApp.AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.select(selectAreVCSAccountsLoaded).pipe(
      tap(vcsAccountsLoaded => {
        if (!vcsAccountsLoaded) {
          this.store.dispatch(RemoteVCSAccountsActions.loadVCSAccounts());
        }
      }),
      filter(vcsAccountsLoaded => vcsAccountsLoaded),
      first()
    );
  }
}
