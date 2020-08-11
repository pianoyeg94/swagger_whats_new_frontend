import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { exhaustMap, first } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { selectUser } from '../auth/store/auth.selectors';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private store: Store<fromApp.AppState>) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {

    return this.store.select(selectUser).pipe(
      first(),
      exhaustMap(user => {
        // If the current user is not logged in
        // or the 'skipAuthInterceptor' header is set on the request,
        // do not attach the Authorization header
        if (!user || req.headers.get('skipAuthInterceptor') === 'true') {
          req = req.clone({
            headers: req.headers.delete('skipAuthInterceptor', 'true')
          });
          return next.handle(req);
        }

        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${user.accessToken}`
          }
        });
        return next.handle(req);
      })
    );
  }
}
