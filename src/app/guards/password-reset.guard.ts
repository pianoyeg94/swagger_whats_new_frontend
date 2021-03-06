import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { first, map, skipWhile, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { AuthActions } from '../auth/store/action-types';

import {
  selectResetToken,
  selectResetTokenValidationInProgress
} from '../auth/store/auth.selectors';


@Injectable({ providedIn: 'root' })
export class PasswordResetGuard implements CanActivate {
  resetTokenValidationInProgress = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {
    this.store.select(selectResetTokenValidationInProgress)
      .subscribe(resetTokenValidationInProgress => {
          this.resetTokenValidationInProgress = resetTokenValidationInProgress;
        }
      );
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    let numRequestsMade = 0;

    return this.store.select(selectResetToken).pipe(
      tap(() => {
          if (!this.resetTokenValidationInProgress && numRequestsMade < 1) {
            this.store.dispatch(
              AuthActions.validatePasswordResetToken({ resetToken: route.params['resetToken'] })
            );
            numRequestsMade++;
          }
        }
      ),
      skipWhile(() => this.resetTokenValidationInProgress),
      first(),
      map(resetToken => resetToken.resetTokenValid ? true : this.router.createUrlTree(['/login'])),
      // Clean up
      tap(() => this.store.dispatch(AuthActions.invalidatePasswordResetToken()))
    );
  }
}
