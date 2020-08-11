import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import { RemoteVCSAccountsActions } from '../../store/vcs-accounts/action-types';
import { selectVCSAccountById } from '../../store/vcs-accounts/vcs-accounts.selectors';


@Injectable({ providedIn: 'root' })
export class VCSAccountResolver implements Resolve<any> {

  constructor(private store: Store<fromApp.AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const vcsAccountId = route.params['id'];
    return this.store.select(selectVCSAccountById(vcsAccountId.toString())).pipe(
      tap(remoteVcsAccount => {
        if (!remoteVcsAccount) {
          this.store.dispatch(RemoteVCSAccountsActions.loadVcsAccount({ vcsAccountId }));
        }
      }),
      filter(remoteVCSAccount => remoteVCSAccount),
      first()
    );
  }
}
