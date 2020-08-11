import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, zip } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../../store/app.reducer';
import { RemoteVCSAccount } from '../../../../models/vcs-account.model';
import { selectCompanyMembershipPermissions } from '../../../../store/main/main.selectors';
import { selectUser } from '../../../../../auth/store/auth.selectors';
import { MainActions } from '../../../../store/main/action-types';
import { selectVCSAccounts } from '../../../../store/vcs-accounts/vcs-accounts.selectors';
import { checkCompanyMembershipPermissions } from '../../../../../utils/check-permissions';


@Component({
  selector: 'app-vcs-accounts-list',
  templateUrl: './vcs-accounts-list.component.html',
  styleUrls: ['./vcs-accounts-list.component.scss']
})
export class VCSAccountsListComponent implements OnInit {
  vcsAccounts$: Observable<RemoteVCSAccount[]>;
  hasRegisterVCSAccountsPermission$: Observable<boolean>;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.store.dispatch(MainActions.ContentChange({ pageTitle: 'VCS Accounts' }));
    this.vcsAccounts$ = this.store.select(selectVCSAccounts);

    this.hasRegisterVCSAccountsPermission$ = zip(
      this.store.select(selectUser).pipe(map(user => user.companyMembershipPermissions)),
      this.store.select(selectCompanyMembershipPermissions).pipe(map(perm => perm.registerVcsAccounts))
    ).pipe(
      map(([currentUserPermissions, registerVcsAccountsPermission]) => checkCompanyMembershipPermissions(
        currentUserPermissions,
        registerVcsAccountsPermission
        )
      )
    );
  }

  onRegisterVCSAccount() {
    this.router.navigate(['register'], { relativeTo: this.route });
  }

  onVCSAccountSelect(vcsAccountId: number) {
    this.router.navigate([vcsAccountId], { relativeTo: this.route });
  }
}
