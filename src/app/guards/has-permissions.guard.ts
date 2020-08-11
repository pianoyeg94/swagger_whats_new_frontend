import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable, zip } from 'rxjs';
import { first, map, skipWhile, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../store/app.reducer';
import { selectUser } from '../auth/store/auth.selectors';
import { selectCompanyMembershipPermissions } from '../main/store/main/main.selectors';
import { MainActions } from '../main/store/main/action-types';
import { checkCompanyMembershipPermissions } from '../utils/check-permissions';


@Injectable({ providedIn: 'root' })
export class HasCompanyMembershipPermissionsGuard implements CanActivate {

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    const permissionToCheckFor: string = route.data['companyMembershipPermission'];
    const redirectOnAccessDeniedUrl: string = route.data['redirectOnAccessDeniedUrl'];

    return zip(
      this.store.select(selectUser).pipe(map(user => user.companyMembershipPermissions)),
      this.store.select(selectCompanyMembershipPermissions).pipe(
        tap(companyMembershipPermissions => !companyMembershipPermissions
          ? this.store.dispatch(MainActions.loadCompanyMembershipPermissions())
          : null
        ),
        skipWhile(companyMembershipPermissions => !companyMembershipPermissions),
        map(companyMembershipPermissions => companyMembershipPermissions[permissionToCheckFor])
      )
    ).pipe(
      first(),
      map(([currentUserPermissions, permissionToCheck]) => (
        checkCompanyMembershipPermissions(currentUserPermissions, permissionToCheck)
          ? true
          : this.router.createUrlTree([redirectOnAccessDeniedUrl])
      ))
    );
  }
}
