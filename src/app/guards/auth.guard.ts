import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { selectUser } from '../auth/store/auth.selectors';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.store.select(selectUser).pipe(
      first(),
      map(user => !!user ? true : this.router.createUrlTree(['/login']))
    );
  }
}
