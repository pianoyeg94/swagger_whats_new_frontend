import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { delay, first, skipWhile, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import { CompanyMembersActions } from '../../store/company-members/action-types';
import {
  selectCompanyMembersIdsListRepr,
  selectCompanyMembersLoading
} from '../../store/company-members/company-members.selectors';


@Injectable({ providedIn: 'root' })
export class CompanyMembersResolver implements Resolve<any> {
  companyMembersLoading = false;
  companyMembersLoadingSubscription: Subscription;


  constructor(private store: Store<fromApp.AppState>) {
    this.companyMembersLoadingSubscription = this.store.select(selectCompanyMembersLoading)
      .subscribe(loading => this.companyMembersLoading = loading);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const pageNumber = route.queryParams['page'] ? +route.queryParams['page'] : 1;
    const pageSize = route.queryParams['page_size'] ? +route.queryParams['page_size'] : 5;
    const from = (pageNumber - 1) * pageSize;
    const to = from + pageSize;

    return this.store.select(selectCompanyMembersIdsListRepr).pipe(
      tap(allIdsListRepr => {
        if (allIdsListRepr === null || allIdsListRepr.slice(from, to).includes(null)) {
          this.store.dispatch(CompanyMembersActions.companyMembersStartedLoading());
          this.store.dispatch(CompanyMembersActions.loadCompanyMembers({
            pageNumber,
            pageSize,
            allIdsListRepr
          }));
        }
      }),
      delay(0),
      skipWhile(() => this.companyMembersLoading),
      first(),
      tap(() => this.companyMembersLoadingSubscription.unsubscribe())
    );
  }
}
