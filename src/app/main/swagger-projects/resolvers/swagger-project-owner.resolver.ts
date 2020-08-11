import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { delay, filter, first, skipWhile, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import { CompanyMembersActions } from '../../store/company-members/action-types';
import { selectCompanyMemberById } from '../../store/company-members/company-members.selectors';
import {
  selectSwaggerProjectById,
  selectSwaggerProjectLoading
} from '../../store/swagger-projects/swagger-projects.selectors';


@Injectable({ providedIn: 'root' })
export class SwaggerProjectOwnerResolver implements Resolve<any> {
  companyOwnerRequestedCount = 0;
  swaggerProjectLoading = false;
  swaggerProjectLoadingSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {
    this.swaggerProjectLoadingSubscription = this.store.select(selectSwaggerProjectLoading)
      .subscribe(isLoading => this.swaggerProjectLoading = isLoading);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const swaggerProjectId = route.params['projectId'];
    let projectOwnerId: number;
    return this.store.select(selectSwaggerProjectById(swaggerProjectId)).pipe(
      delay(0),
      skipWhile(() => this.swaggerProjectLoading),
      tap(swaggerProject => projectOwnerId = swaggerProject.projectOwnerId),
      switchMap(swaggerProject => this.store.select(selectCompanyMemberById(
        swaggerProject.projectOwnerId
      ))),
      tap(projectOwner => {
        if (projectOwner === undefined && this.companyOwnerRequestedCount < 1) {
          this.companyOwnerRequestedCount++;
          this.store.dispatch(CompanyMembersActions.loadCompanyMember({
            companyMemberId: projectOwnerId
          }));
        }
      }),
      filter(projectOwner => projectOwner),
      first(),
      tap(() => this.swaggerProjectLoadingSubscription.unsubscribe())
    );
  }
}
