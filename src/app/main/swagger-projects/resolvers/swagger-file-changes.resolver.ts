import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { delay, filter, first, skipWhile, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import { SwaggerFileChangesActions } from '../../store/swagger-file-changes/action-types';
import {
  selectSwaggerProjectById,
  selectSwaggerProjectLoading
} from '../../store/swagger-projects/swagger-projects.selectors';


@Injectable({ providedIn: 'root' })
export class SwaggerFileChangesResolver implements Resolve<any> {
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
    return this.store.select(selectSwaggerProjectById(swaggerProjectId)).pipe(
      delay(0),
      skipWhile(() => this.swaggerProjectLoading),
      tap(swaggerProject => {
        if (!swaggerProject.swaggerFileChangeIds) {
          this.store.dispatch(SwaggerFileChangesActions.loadSwaggerFileChanges({ swaggerProject }));
        }
      }),
      filter(swaggerProject => swaggerProject.swaggerFileChangeIds),
      first(),
      tap(() => this.swaggerProjectLoadingSubscription.unsubscribe())
    );
  }
}
