import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { first, skipWhile, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../store/app.reducer';
import { selectCompanyDetails } from '../store/company/company.selectors';
import { CompanyActions } from '../store/company/action-types';


@Injectable({ providedIn: 'root' })
export class CompanyResolver implements Resolve<any> {

  constructor(private store: Store<fromApp.AppState>) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    return this.store.select(selectCompanyDetails).pipe(
      tap(company => {
        if (!company) {
          this.store.dispatch(CompanyActions.loadCompanyDetails());
        }
      }),
      skipWhile(company => !company),
      first()
    );
  }
}
