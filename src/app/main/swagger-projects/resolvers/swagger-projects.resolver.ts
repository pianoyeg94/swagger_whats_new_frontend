import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { delay, first, skipWhile, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import { SwaggerProjectsActions } from '../../store/swagger-projects/action-types';
import {
  selectSwaggerProjectIdsListRepr,
  selectSwaggerProjectsLoading
} from '../../store/swagger-projects/swagger-projects.selectors';


@Injectable({ providedIn: 'root' })
export class SwaggerProjectsResolver implements Resolve<any> {
  swaggerProjectsLoading = false;
  swaggerProjectsLoadingSubscription: Subscription;


  constructor(private store: Store<fromApp.AppState>) {
    this.swaggerProjectsLoadingSubscription = this.store.select(selectSwaggerProjectsLoading)
      .subscribe(loading => this.swaggerProjectsLoading = loading);
  }

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    const pageNumber = route.queryParams['page'] ? +route.queryParams['page'] : 1;
    const pageSize = route.queryParams['page_size'] ? +route.queryParams['page_size'] : 5;
    const from = (pageNumber - 1) * pageSize;
    const to = from + pageSize;

    return this.store.select(selectSwaggerProjectIdsListRepr).pipe(
      tap(allIdsListRepr => {
        if (allIdsListRepr === null || allIdsListRepr.slice(from, to).includes(null)) {
          this.store.dispatch(SwaggerProjectsActions.swaggerProjectsStartedLoading());
          this.store.dispatch(SwaggerProjectsActions.loadSwaggerProjects({
            pageNumber,
            pageSize,
            allIdsListRepr
          }));
        }
      }),
      delay(0),
      skipWhile(() => this.swaggerProjectsLoading),
      first(),
      tap(() => this.swaggerProjectsLoadingSubscription.unsubscribe())
    );
  }
}
