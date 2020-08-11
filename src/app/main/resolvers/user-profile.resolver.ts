import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { first, skipWhile, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import { UserProfileActions } from '../store/user-profile/action-types';
import { selectUserProfile } from '../store/user-profile/user-profile.selectors';


@Injectable({ providedIn: 'root' })
export class UserProfileResolver implements Resolve<any> {

  constructor(private store: Store<fromApp.AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.select(selectUserProfile).pipe(
      tap(userProfile => {
        if (!userProfile) {
          this.store.dispatch(UserProfileActions.loadUserProfile());
        }
      }),
      skipWhile(userProfile => !userProfile),
      first()
    );
  }
}
