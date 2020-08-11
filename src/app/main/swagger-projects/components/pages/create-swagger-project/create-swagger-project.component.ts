import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { delay, first, skipWhile, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../../store/app.reducer';
import { MainActions } from '../../../../store/main/action-types';
import { RemoteVCSAccountsActions } from '../../../../store/vcs-accounts/action-types';
import { SwaggerProjectsActions } from '../../../../store/swagger-projects/action-types';
import { AppActions } from '../../../../../store/action-types';
import { RemoteVCSAccount } from '../../../../models/vcs-account.model';
import { UrlFormatValidator } from '../../../../../validators/url-format.validator';
import { UniqueRemoteRepoBranchValidator } from '../../../validators/unique-remote-repo-branch.validator';
import { UniqueSwaggerProjectNameValidator } from '../../../validators/unique-swagger-project-name.validator';
import {
  selectAreVCSAccountsLoaded,
  selectVCSAccountById,
  selectVCSAccounts
} from '../../../../store/vcs-accounts/vcs-accounts.selectors';


@Component({
  selector: 'app-create-swagger-project',
  templateUrl: './create-swagger-project.component.html',
  styleUrls: ['./create-swagger-project.component.scss']
})
export class CreateSwaggerProjectComponent implements OnInit, OnDestroy {
  vcsAccountsSubscription: Subscription;
  useVCSFormControlSubscription: Subscription;
  remoteVCSAccounts: RemoteVCSAccount[];
  remoteVCSAccountCurrentValue = null;
  remoteRepoBranchCurrentValue = null;
  remoteRepoNameCurrentValue = null;

  swaggerProjectForm = new FormGroup({
    projectName: new FormControl('',
      [Validators.required],
      [this.uniqueSwaggerProjectNameValidator.validate]
    ),
    swaggerFileUrl: new FormControl('', [
      Validators.required,
      this.urlFormatValidator.validate
    ]),
    useVcs: new FormControl(false),
  });

  constructor(
    private store: Store<fromApp.AppState>,
    private urlFormatValidator: UrlFormatValidator,
    private uniqueSwaggerProjectNameValidator: UniqueSwaggerProjectNameValidator,
    private uniqueRemoteRepoBranchValidator: UniqueRemoteRepoBranchValidator
  ) {}

  ngOnInit() {
    this.store.dispatch(MainActions.ContentChange({
      pageTitle: 'Please Create a New Swagger Project'
    }));

    this.vcsAccountsSubscription = this.store.select(selectAreVCSAccountsLoaded).pipe(
      tap(vcsAccountsLoaded => !vcsAccountsLoaded
        ? this.store.dispatch(
          RemoteVCSAccountsActions.loadVCSAccountsForSwaggerProject()
        )
        : null
      ),
      skipWhile(areVCSAccountsLoaded => !areVCSAccountsLoaded),
      switchMap(() => this.store.select(selectVCSAccounts)),
      first(),
    ).subscribe(vcsAccounts => {
      this.remoteVCSAccounts = vcsAccounts;
      this.remoteVCSAccountCurrentValue = vcsAccounts.length > 0
        ? vcsAccounts[0].id
        : null;
    });

    this.useVCSFormControlSubscription = this.swaggerProjectForm.get('useVcs').valueChanges
      .pipe(
        tap(value => {
          if (value && this.remoteVCSAccounts.length > 0) {
            this.swaggerProjectForm.addControl('remoteRepoName', new FormControl(
              this.remoteRepoNameCurrentValue,
              [Validators.required]
            ));
            this.swaggerProjectForm.addControl('remoteRepoBranch', new FormControl(
              this.remoteRepoBranchCurrentValue,
              [Validators.required],
            ));
            this.swaggerProjectForm.addControl('remoteVcsAccount', new FormControl(
              this.remoteVCSAccountCurrentValue
            ));

            this.swaggerProjectForm.setAsyncValidators([this.uniqueRemoteRepoBranchValidator.validate]);
          }
        }),
        tap(value => {
          if (!value && this.remoteVCSAccounts.length > 0) {
            this.remoteVCSAccountCurrentValue = this.swaggerProjectForm.get(
              'remoteVcsAccount'
            ).value;
            this.remoteRepoBranchCurrentValue = this.swaggerProjectForm.get(
              'remoteRepoBranch'
            ).value;
            this.remoteRepoNameCurrentValue = this.swaggerProjectForm.get(
              'remoteRepoName'
            ).value;

            this.swaggerProjectForm.clearAsyncValidators();

            this.swaggerProjectForm.removeControl('remoteRepoName');
            this.swaggerProjectForm.removeControl('remoteRepoBranch');
            this.swaggerProjectForm.removeControl('remoteVcsAccount');
          }
        }),
        delay(0),
        tap(() => {
          this.swaggerProjectForm.get('projectName').updateValueAndValidity();
        })
      ).subscribe();
  }

  onSubmit() {
    if (!this.swaggerProjectForm.valid) {
      return;
    }

    const { projectName, swaggerFileUrl, useVcs } = this.swaggerProjectForm.value;

    // tslint:disable-next-line:prefer-const
    let { remoteRepoName, remoteVcsAccount, remoteRepoBranch } = useVcs
      ? this.swaggerProjectForm.value
      : { remoteRepoName: null, remoteVcsAccount: null, remoteRepoBranch: null };

    if (useVcs) {
      const sub = this.store.select(selectVCSAccountById(remoteVcsAccount.toString()))
        .subscribe(value => {
          remoteVcsAccount = { vcsService: value.service, accountName: value.accountName };
        });
      sub.unsubscribe();
    }

    const swaggerProject = {
      projectName,
      swaggerFileUrl,
      useVcs,
      remoteRepoName,
      remoteRepoBranch,
      remoteVcsAccount
    };

    this.store.dispatch(SwaggerProjectsActions.createSwaggerProject({ swaggerProject }));
    this.store.dispatch(AppActions.appNavigationStart());
  }

  ngOnDestroy() {
    this.vcsAccountsSubscription.unsubscribe();
    this.useVCSFormControlSubscription.unsubscribe();
  }
}
