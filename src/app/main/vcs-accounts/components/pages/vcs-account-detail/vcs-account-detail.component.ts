import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../../store/app.reducer';
import { selectUser } from '../../../../../auth/store/auth.selectors';
import { MainActions } from '../../../../store/main/action-types';
import { RemoteVCSAccountsActions } from '../../../../store/vcs-accounts/action-types';
import { User } from '../../../../../auth/models/user.model';
import { RemoteVCSAccount } from '../../../../models/vcs-account.model';
import { selectVCSAccountById } from '../../../../store/vcs-accounts/vcs-accounts.selectors';


@Component({
  selector: 'app-vcs-account-detail',
  templateUrl: './vcs-account-detail.component.html',
  styleUrls: ['./vcs-account-detail.component.scss']
})
export class VCSAccountDetailComponent implements OnInit {
  vcsAccount$: Observable<RemoteVCSAccount>;
  user$: Observable<User>;

  vcsAccountId: number;
  popupVisible = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.vcsAccount$ = this.route.params.pipe(
      switchMap(params => this.store.select(selectVCSAccountById(params['id'].toString()))),
      tap(vcsAccount => this.store.dispatch(MainActions.ContentChange({
        pageTitle: vcsAccount.accountName
      }))),
      tap(vcsAccount => this.vcsAccountId = vcsAccount.id)
    );

    this.user$ = this.store.select(selectUser);
  }

  onOpenPopup() {
    this.popupVisible = true;
  }

  onPopupClose() {
    this.popupVisible = false;
  }

  onAccountDelete() {
    this.store.dispatch(RemoteVCSAccountsActions.deleteVCSAccount({
      vcsAccountId: this.vcsAccountId
    }));
    this.router.navigateByUrl('vcs-accounts');
  }
}
