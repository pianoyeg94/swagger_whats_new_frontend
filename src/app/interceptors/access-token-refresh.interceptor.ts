import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, exhaustMap, first, skipWhile, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { AuthActions } from '../auth/store/action-types';
import { selectTokenRefreshInProgress, selectUser } from '../auth/store/auth.selectors';


@Injectable()
export class AccessTokenRefreshInterceptor implements HttpInterceptor {
  tokenRefreshInProgress = false;

  constructor(private store: Store<fromApp.AppState>) {
    this.store.select(selectTokenRefreshInProgress)
      .subscribe(refreshInProgress => {
        this.tokenRefreshInProgress = refreshInProgress;
      });
  }

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Do not block the refresh token request
    if (req.url.endsWith('/access-token-refresh/')) {
      return next.handle(req);
    }

    // If the user is logged in and his auth token is going to expire in 1 minute,
    // trigger a refresh token request, block while the request is in progress.
    return this.store.select(selectUser).pipe(
      tap(user => {
        if (user) {
          const oneMinuteBeforeTokenExpires = new Date(
            new Date(user.accessTokenExpirationDate).getTime() - 1000 * 60
          );
          if (new Date() > oneMinuteBeforeTokenExpires && !this.tokenRefreshInProgress) {
            this.store.dispatch(AuthActions.refreshAccessToken({ refreshToken: user.refreshToken }));
          }
        }
      }),
      delay(0),
      skipWhile(() => this.tokenRefreshInProgress),
      first(),
      exhaustMap(() => next.handle(req))
    );
  }
}
