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
import { selectIsUserAfterCompanyRegistration } from '../main/store/main/main.selectors';


@Injectable({ providedIn: 'root' })
export class EmailConfirmationHintGuard implements CanActivate {

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.store.select(selectIsUserAfterCompanyRegistration).pipe(
      first(),
      map(afterCompanyRegistration => afterCompanyRegistration
        ? true
        : this.router.createUrlTree(['/swagger-projects'])
      )
    );
  }
}
