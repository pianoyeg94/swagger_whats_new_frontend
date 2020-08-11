import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { delay, first, map, skipWhile, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { AuthActions } from '../auth/store/action-types';
import {
  selectInvitationToken,
  selectInvitationTokenValidationInProgress
} from '../auth/store/auth.selectors';


@Injectable({ providedIn: 'root' })
export class IsInvitedGuard implements CanActivate {
  invitationTokenValidationInProgress = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {
    this.store.select(selectInvitationTokenValidationInProgress)
      .subscribe(validationInProgress => {
          this.invitationTokenValidationInProgress = validationInProgress;
        }
      );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    let numRequestsMade = 0;

    return this.store.select(selectInvitationToken).pipe(
      tap(() => {
          if (!this.invitationTokenValidationInProgress && numRequestsMade < 1) {
            this.store.dispatch(
              AuthActions.validateInvitationToken({
                invitationToken: route.params['invitationToken']
              })
            );
            numRequestsMade++;
          }
        }
      ),
      delay(0),
      skipWhile(() => this.invitationTokenValidationInProgress),
      first(),
      map(resetToken => resetToken.invitationTokenValid ? true : this.router.createUrlTree(['/login'])),
      // Clean up
      tap(() => this.store.dispatch(AuthActions.invalidateInvitationToken()))
    );
  }
}
