import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../store/app.reducer';
import { RemoteVCSAccountsActions } from '../../../store/vcs-accounts/action-types';


@Component({
  selector: 'app-post-vcs-account-registration',
  templateUrl: './post-vcs-account-registration.component.html',
  styleUrls: ['./post-vcs-account-registration.component.scss']
})
export class PostVCSAccountRegistrationComponent implements OnInit {
  tempToken: string;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.tempToken = this.route.snapshot.queryParams['code'];
    const vcsAccountData = JSON.parse(localStorage.getItem('vcsAccountTemp'));
    localStorage.removeItem('vcsAccountTemp');

    this.store.dispatch(RemoteVCSAccountsActions.registerVCSAccount({
      remoteVCSAccount: {
        tempToken: this.tempToken,
        ...vcsAccountData
      }
    }));
  }
}
