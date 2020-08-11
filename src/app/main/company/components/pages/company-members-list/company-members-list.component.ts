import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, Observable, Subscription } from 'rxjs';
import { delay, filter, map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../../store/app.reducer';
import { AppActions } from '../../../../../store/action-types';
import { CompanyMembersActions } from '../../../../store/company-members/action-types';
import { CompanyMember } from '../../../../models/company-member.model';
import { User } from '../../../../../auth/models/user.model';
import { UserProfile } from '../../../../models/user-profile.model';
import { selectUserProfile } from '../../../../store/user-profile/user-profile.selectors';
import { selectUser } from '../../../../../auth/store/auth.selectors';
import { selectCompanyMembershipPermissions } from '../../../../store/main/main.selectors';
import { MainActions } from '../../../../store/main/action-types';
import { selectCompanyDetails } from '../../../../store/company/company.selectors';
import { checkCompanyMembershipPermissions } from '../../../../../utils/check-permissions';
import {
  selectCompanyMembersByIdsList,
  selectCompanyMembersCurrentPageNumber,
  selectCompanyMembersCurrentPageSize,
  selectCompanyMembersIdsListRepr,
  selectCompanyMembersLoading,
  selectCompanyMembersOverallEntitiesCount
} from '../../../../store/company-members/company-members.selectors';


@Component({
  selector: 'app-company-members-list',
  templateUrl: './company-members-list.component.html',
  styleUrls: ['./company-members-list.component.scss']
})
export class CompanyMembersListComponent implements OnInit, OnDestroy {
  companyMembers$: Observable<CompanyMember[]>;
  user$: Observable<User>;
  userProfile$: Observable<UserProfile>;
  hasInviteMemberPermission$: Observable<boolean>;
  numberOfPages$: Observable<number>;
  overallEntitiesCount$: Observable<number>;
  selectedPageNumber$: Observable<number>;
  selectedPageSize$: Observable<number>;

  companyMembersLoading = false;
  companyMembersLoadingSubscription: Subscription;
  companySubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.companySubscription = this.store.select(selectCompanyDetails)
      .subscribe(company => this.store.dispatch(
        MainActions.ContentChange({ pageTitle: company.companyName })
      ));

    this.companyMembersLoadingSubscription = this.store.select(selectCompanyMembersLoading)
      .subscribe(loading => this.companyMembersLoading = loading);

    this.companyMembers$ = combineLatest([
      this.store.select(selectCompanyMembersCurrentPageSize),
      this.store.select(selectCompanyMembersCurrentPageNumber),
      this.store.select(selectCompanyMembersIdsListRepr)
    ]).pipe(
      map(([pageSize, pageNumber, idsListRepr]) => {
        const from = (pageNumber - 1) * pageSize;
        const to = from + pageSize;
        if (idsListRepr === null || idsListRepr.slice(from, to).includes(null)) {
          this.store.dispatch(CompanyMembersActions.companyMembersStartedLoading());
          this.store.dispatch(CompanyMembersActions.loadCompanyMembers({
            pageNumber,
            pageSize,
            allIdsListRepr: idsListRepr
          }));
          this.store.dispatch(AppActions.appNavigationStart());
        }
        return idsListRepr ? idsListRepr.slice(from, to) : [];
      }),
      delay(0),
      filter(() => !this.companyMembersLoading),
      tap(() => this.store.dispatch(AppActions.appNavigationEnd())),
      switchMap(idsListRepr => this.store.select(selectCompanyMembersByIdsList(idsListRepr)))
    );

    this.user$ = this.store.select(selectUser);
    this.userProfile$ = this.store.select(selectUserProfile);

    this.hasInviteMemberPermission$ = combineLatest([
      this.store.select(selectUser).pipe(map(user => user ? user.companyMembershipPermissions : null)),
      this.store.select(selectCompanyMembershipPermissions)
    ]).pipe(
      map(([currentUserPermissions, membershipPermissionsMapping]) =>
        checkCompanyMembershipPermissions(
          currentUserPermissions,
          membershipPermissionsMapping.inviteNewUsers
        )
      )
    );

    this.numberOfPages$ = combineLatest([
      this.store.select(selectCompanyMembersCurrentPageSize),
      this.store.select(selectCompanyMembersOverallEntitiesCount)
    ]).pipe(
      map(([pageSize, overallEntitiesCount]) => overallEntitiesCount % pageSize === 0
        ? Math.floor(overallEntitiesCount / pageSize)
        : Math.floor(overallEntitiesCount / pageSize) + 1
      )
    );

    this.overallEntitiesCount$ = this.store.select(selectCompanyMembersOverallEntitiesCount);
    this.selectedPageNumber$ = this.store.select(selectCompanyMembersCurrentPageNumber);
    this.selectedPageSize$ = this.store.select(selectCompanyMembersCurrentPageSize);
  }

  onInviteNewCompanyMember() {
    this.router.navigate(['invitation'], { relativeTo: this.route });
  }

  onCompanyMemberSelect(memberId: number) {
    this.router.navigate(['users', memberId], { relativeTo: this.route });
  }

  onPageChange(pageNumber: number) {
    this.router.navigate([], {
      queryParams: { page: pageNumber },
      queryParamsHandling: 'merge'
    });
    this.store.dispatch(CompanyMembersActions.companyMembersPageChanged({ pageNumber }));
  }

  onPageSizeChange(pageSize: number) {
    this.router.navigate([], {
      queryParams: { page_size: pageSize, page: 1 },
      queryParamsHandling: 'merge'
    });
    this.store.dispatch(CompanyMembersActions.companyMembersPageSizeChanged({ pageSize }));
    this.store.dispatch(CompanyMembersActions.companyMembersPageChanged({ pageNumber: 1 }));
  }

  ngOnDestroy() {
    this.companyMembersLoadingSubscription.unsubscribe();
    this.companySubscription.unsubscribe();
    this.store.dispatch(CompanyMembersActions.companyMembersPageSizeChanged({ pageSize: 5 }));
    this.store.dispatch(CompanyMembersActions.companyMembersPageChanged({ pageNumber: 1 }));
  }
}
