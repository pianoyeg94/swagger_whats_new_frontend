import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../../store/app.reducer';
import { MainActions } from '../../../../store/main/action-types';
import { selectUser } from '../../../../../auth/store/auth.selectors';
import { selectCompanyMembershipPermissions } from '../../../../store/main/main.selectors';
import { User } from '../../../../../auth/models/user.model';
import { CompanyMember } from '../../../../models/company-member.model';
import { selectCompanyMemberById } from '../../../../store/company-members/company-members.selectors';
import { checkCompanyMembershipPermissions } from '../../../../../utils/check-permissions';
import { transformPermissionsObject } from '../../../helpers/transform-permissions-object';
import { CompanyMembersActions } from '../../../../store/company-members/action-types';


@Component({
  selector: 'app-company-member-details',
  templateUrl: './company-member-details.component.html',
  styleUrls: ['./company-member-details.component.scss']
})
export class CompanyMemberDetailsComponent implements OnInit, OnDestroy {
  companyMember$: Observable<CompanyMember>;
  user$: Observable<User>;
  permissionsSubscription: Subscription;

  companyMembershipPermissions: { value: number, label: string }[];
  initialPermissions: number;
  companyMemberId: number;
  popupVisible = false;

  companyMemberUpdateForm = new FormGroup({
    companyMembershipPermissions: new FormControl([])
  });

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.companyMember$ = this.route.params.pipe(
      switchMap(params => this.store.select(selectCompanyMemberById(params['memberId'].toString()))),
      tap(companyMember => this.store.dispatch(MainActions.ContentChange({
        pageTitle: `${companyMember.firstName} ${companyMember.lastName}`
      }))),
      tap(companyMember => this.companyMemberId = companyMember.id),
      tap(companyMember => this.initialPermissions = companyMember.permissions),
      tap(companyMember => {
        const permissionsList = this.companyMembershipPermissions.filter(
          permission => checkCompanyMembershipPermissions(companyMember.permissions, permission.value)
        );
        this.companyMemberUpdateForm.get('companyMembershipPermissions').setValue(permissionsList);
      }),
      shareReplay()
    );

    this.user$ = this.store.select(selectUser);

    this.permissionsSubscription = this.store.select(selectCompanyMembershipPermissions).pipe(
      map(companyMembershipPermissions => transformPermissionsObject(companyMembershipPermissions))
    ).subscribe(permissions => this.companyMembershipPermissions = permissions);
  }

  onPopupOpen() {
    this.popupVisible = true;
  }

  onPopupClose() {
    this.popupVisible = false;
  }

  onMemberUpdate() {
    const { companyMembershipPermissions } = this.companyMemberUpdateForm.value;
    const permissions = companyMembershipPermissions.length > 0
      ? companyMembershipPermissions
        .map(permission => permission.value)
        .reduce((total, amount) => total + amount)
      : 0;

    if (this.initialPermissions === permissions) { return; }

    this.store.dispatch(CompanyMembersActions.updateCompanyMember({
      companyMemberId: this.companyMemberId,
      companyMembershipPermissions: permissions
    }));
  }

  onMemberDelete() {
    this.store.dispatch(CompanyMembersActions.deleteCompanyMember({
      companyMemberId: this.companyMemberId
    }));
  }

  ngOnDestroy() {
    this.permissionsSubscription.unsubscribe();
  }
}
