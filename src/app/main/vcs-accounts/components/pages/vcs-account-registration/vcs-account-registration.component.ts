import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';

import * as fromApp from '../../../../../store/app.reducer';
import { MainActions } from '../../../../store/main/action-types';
import { UniqueVCSAccountValidator } from '../../../validators/unique-vcs-account.validator';
import { VCSAccountExistsValidator } from '../../../validators/vcs-account-exists.validator';


@Component({
  selector: 'app-vcs-account-registration',
  templateUrl: './vcs-account-registration.component.html',
  styleUrls: ['./vcs-account-registration.component.scss']
})
export class VCSAccountRegistrationComponent implements OnInit {

  vcsAccountRegistrationForm = new FormGroup({
    vcsService: new FormControl('GH', [Validators.required]),
    accountType: new FormControl('O', [Validators.required]),
    accountName: new FormControl('', [Validators.required])
  }, {
    asyncValidators: [
      this.uniqueVCSAccountValidator.validate,
      this.vcsAccountExistsValidator.validate
    ]
  });

  constructor(
    private store: Store<fromApp.AppState>,
    private uniqueVCSAccountValidator: UniqueVCSAccountValidator,
    private vcsAccountExistsValidator: VCSAccountExistsValidator,
  ) {}

  ngOnInit() {
    this.store.dispatch(MainActions.ContentChange({
      pageTitle: 'Please Register a New VCS Account'
    }));
  }

  onSubmit() {
    if (!this.vcsAccountRegistrationForm.valid) { return; }

    const { vcsService, accountType, accountName } = this.vcsAccountRegistrationForm.value;

    localStorage.setItem('vcsAccountTemp', JSON.stringify({
      service: vcsService,
      accountType,
      accountName
    }));

    if (vcsService === 'GH') {
      (window as any).open(
        environment.githubOAuthUrl,
        '_self'
      );
    } else if (vcsService === 'BB') {
      (window as any).open(
        environment.bitbucketOAuthUrl,
        '_self'
      );
    }
  }
}
