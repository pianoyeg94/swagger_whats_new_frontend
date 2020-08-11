import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { delay, filter, map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../../store/app.reducer';
import { MainActions } from '../../../../store/main/action-types';
import { SwaggerProjectsActions } from '../../../../store/swagger-projects/action-types';
import { AppActions } from '../../../../../store/action-types';
import { SwaggerProject } from '../../../../models/swagger-project.model';
import { selectUser } from '../../../../../auth/store/auth.selectors';
import { selectCompanyMembershipPermissions } from '../../../../store/main/main.selectors';
import { checkCompanyMembershipPermissions } from '../../../../../utils/check-permissions';
import {
  selectSwaggerProjectIdsListRepr,
  selectSwaggerProjectsByIdsList,
  selectSwaggerProjectsCurrentPageNumber,
  selectSwaggerProjectsCurrentPageSize,
  selectSwaggerProjectsLoading,
  selectSwaggerProjectsOverallEntitiesCount
} from '../../../../store/swagger-projects/swagger-projects.selectors';


@Component({
  selector: 'app-swagger-projects-list',
  templateUrl: './swagger-projects-list.component.html',
  styleUrls: ['./swagger-projects-list.component.scss']
})
export class SwaggerProjectsListComponent implements OnInit, OnDestroy {
  swaggerProjects$: Observable<SwaggerProject[]>;
  swaggerProjectsExist$: Observable<boolean>;
  hasCreateSwaggerProjectsPermissions$: Observable<boolean>;
  numberOfPages$: Observable<number>;
  overallEntitiesCount$: Observable<number>;
  selectedPageNumber$: Observable<number>;
  selectedPageSize$: Observable<number>;

  swaggerProjectsLoading = false;
  swaggerProjectsLoadingSubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.store.dispatch(MainActions.ContentChange({ pageTitle: 'Swagger Projects' }));

    this.swaggerProjects$ = combineLatest([
      this.store.select(selectSwaggerProjectsCurrentPageSize),
      this.store.select(selectSwaggerProjectsCurrentPageNumber),
      this.store.select(selectSwaggerProjectIdsListRepr)
    ]).pipe(
      map(([pageSize, pageNumber, idsListRepr]) => {
        const from = (pageNumber - 1) * pageSize;
        const to = from + pageSize;
        if (idsListRepr === null || idsListRepr.slice(from, to).includes(null)) {
          this.store.dispatch(SwaggerProjectsActions.swaggerProjectsStartedLoading());
          this.store.dispatch(SwaggerProjectsActions.loadSwaggerProjects({
            pageNumber,
            pageSize,
            allIdsListRepr: idsListRepr
          }));
          this.store.dispatch(AppActions.appNavigationStart());
        }
        return idsListRepr ? idsListRepr.slice(from, to) : [];
      }),
      delay(0),
      filter(() => !this.swaggerProjectsLoading),
      tap(() => this.store.dispatch(AppActions.appNavigationEnd())),
      switchMap(idsListRepr => this.store.select(selectSwaggerProjectsByIdsList(idsListRepr)))
    );

    this.swaggerProjectsExist$ = this.swaggerProjects$.pipe(
      map(swaggerProjects => swaggerProjects.length > 0)
    );

    this.hasCreateSwaggerProjectsPermissions$ = combineLatest([
      this.store.select(selectUser).pipe(map(user => user ? user.companyMembershipPermissions : null)),
      this.store.select(selectCompanyMembershipPermissions)
    ]).pipe(
      map(([currentUserPermissions, membershipPermissionsMapping]) =>
        checkCompanyMembershipPermissions(
          currentUserPermissions,
          membershipPermissionsMapping.createSwaggerProjects
        )
      )
    );

    this.numberOfPages$ = combineLatest([
      this.store.select(selectSwaggerProjectsCurrentPageSize),
      this.store.select(selectSwaggerProjectsOverallEntitiesCount)
    ]).pipe(
      map(([pageSize, overallEntitiesCount]) => overallEntitiesCount % pageSize === 0
        ? Math.floor(overallEntitiesCount / pageSize)
        : Math.floor(overallEntitiesCount / pageSize) + 1
      )
    );

    this.overallEntitiesCount$ = this.store.select(selectSwaggerProjectsOverallEntitiesCount);
    this.selectedPageNumber$ = this.store.select(selectSwaggerProjectsCurrentPageNumber);
    this.selectedPageSize$ = this.store.select(selectSwaggerProjectsCurrentPageSize);

    this.swaggerProjectsLoadingSubscription = this.store.select(selectSwaggerProjectsLoading)
      .subscribe(loading => this.swaggerProjectsLoading = loading);
  }

  onCreateSwaggerProject() {
    this.router.navigate(['create'], { relativeTo: this.route });
  }

  onSwaggerProjectSelect(swaggerProjectId: number) {
    this.router.navigate([swaggerProjectId], { relativeTo: this.route });
  }

  onPageChange(pageNumber: number) {
    this.router.navigate([], {
      queryParams: { page: pageNumber },
      queryParamsHandling: 'merge'
    });
    this.store.dispatch(SwaggerProjectsActions.swaggerProjectsPageChanged({ pageNumber }));
  }

  onPageSizeChange(pageSize: number) {
    this.router.navigate([], {
      queryParams: { page_size: pageSize, page: 1 },
      queryParamsHandling: 'merge'
    });
    this.store.dispatch(SwaggerProjectsActions.swaggerProjectsPageSizeChanged({ pageSize }));
    this.store.dispatch(SwaggerProjectsActions.swaggerProjectsPageChanged({ pageNumber: 1 }));
  }

  ngOnDestroy() {
    this.swaggerProjectsLoadingSubscription.unsubscribe();
    this.store.dispatch(SwaggerProjectsActions.swaggerProjectsPageSizeChanged({ pageSize: 5 }));
    this.store.dispatch(SwaggerProjectsActions.swaggerProjectsPageChanged({ pageNumber: 1 }));
  }
}
