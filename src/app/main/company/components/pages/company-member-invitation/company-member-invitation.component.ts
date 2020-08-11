import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../../store/app.reducer';
import { MainActions } from '../../../../store/main/action-types';
import { CompanyMembersActions } from '../../../../store/company-members/action-types';
import { selectCompanyMembershipPermissions } from '../../../../store/main/main.selectors';
import { transformPermissionsObject } from '../../../helpers/transform-permissions-object';


@Component({
  selector: 'app-company-member-invitation',
  templateUrl: './company-member-invitation.component.html',
  styleUrls: ['./company-member-invitation.component.scss']
})
export class CompanyMemberInvitationComponent implements OnInit {
  companyMembershipPermissions$: Observable<{ value: number, label: string }[]>;

  companyMemberInvitationForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    companyMembershipPermissions: new FormControl([])
  });

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.dispatch(MainActions.ContentChange({
      pageTitle: 'Please Invite a New Company Member'
    }));

    this.companyMembershipPermissions$ = this.store.select(
      selectCompanyMembershipPermissions
    ).pipe(
      map(companyMembershipPermissions => transformPermissionsObject(companyMembershipPermissions))
    );
  }

  onSubmit() {
    if (!this.companyMemberInvitationForm.valid) { return; }

    const { email, companyMembershipPermissions } = this.companyMemberInvitationForm.value;
    const permissions = companyMembershipPermissions.length > 0
      ? companyMembershipPermissions
        .map(permission => permission.value)
        .reduce((total, amount) => total + amount)
      : 0;

    this.store.dispatch(CompanyMembersActions.inviteCompanyMember({
      email,
      companyMembershipPermissions: permissions
    }));
  }
}
