import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { first, skipWhile, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import { selectCompanyMembershipPermissions } from '../store/main/main.selectors';
import { MainActions } from '../store/main/action-types';


@Injectable({ providedIn: 'root' })
export class CompanyMembershipPermissionsResolver implements Resolve<any> {

  constructor(private store: Store<fromApp.AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.select(selectCompanyMembershipPermissions).pipe(
      tap(companyMembershipPermissions => {
        if (!companyMembershipPermissions) {
          this.store.dispatch(MainActions.loadCompanyMembershipPermissions());
        }
      }),
      skipWhile(companyMembershipPermissions => !companyMembershipPermissions),
      first()
    );
  }
}
