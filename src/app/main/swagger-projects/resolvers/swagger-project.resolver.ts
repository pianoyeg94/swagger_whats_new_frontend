import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { delay, first, skipWhile, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import { SwaggerProjectsActions } from '../../store/swagger-projects/action-types';
import {
  selectSwaggerProjectById,
  selectSwaggerProjectLoading
} from '../../store/swagger-projects/swagger-projects.selectors';


@Injectable({ providedIn: 'root' })
export class SwaggerProjectResolver implements Resolve<any> {
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
    return this.store.select(selectSwaggerProjectById(swaggerProjectId.toString())).pipe(
      tap(swaggerProject => {
        if (!swaggerProject) {
          this.store.dispatch(SwaggerProjectsActions.swaggerProjectStartedLoading());
          this.store.dispatch(SwaggerProjectsActions.loadSwaggerProject({ swaggerProjectId }));
        }
      }),
      delay(0),
      skipWhile(() => this.swaggerProjectLoading),
      first(),
      tap(() => this.swaggerProjectLoadingSubscription.unsubscribe())
    );
  }
}
