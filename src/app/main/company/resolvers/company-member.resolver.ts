import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, first, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import { selectCompanyMemberById } from '../../store/company-members/company-members.selectors';
import { CompanyMembersActions } from '../../store/company-members/action-types';


@Injectable({ providedIn: 'root' })
export class CompanyMemberResolver implements Resolve<any> {

  constructor(private store: Store<fromApp.AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const companyMemberId = route.params['memberId'];
    return this.store.select(selectCompanyMemberById(companyMemberId)).pipe(
      tap(companyMember => !companyMember
        ? this.store.dispatch(CompanyMembersActions.loadCompanyMember({
          companyMemberId: +companyMemberId
        }))
        : null
      ),
      filter(companyMember => companyMember),
      first()
    );
  }
}
