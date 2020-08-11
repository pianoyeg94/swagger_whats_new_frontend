import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import { UniqueEmailValidator } from '../../../validators/unique-email.validator';
import { PasswordConfirmationValidator } from '../../../validators/password-confirmation.validator';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthActions } from '../../store/action-types';

@Component({
  selector: 'app-invitation-based-registration',
  templateUrl: './invitation-based-registration.component.html',
  styleUrls: ['./invitation-based-registration.component.scss']
})
export class InvitationBasedRegistrationComponent implements OnInit {
  invitationToken: string;

  standardValidators = [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30)
  ];

  registrationForm = new FormGroup({
    firstName: new FormControl('', this.standardValidators),
    lastName: new FormControl('', this.standardValidators),
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(50)
    ], [this.uniqueEmailValidator.validate]),
    jobTitle: new FormControl('', this.standardValidators),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30)
    ]),
    passwordConfirmation: new FormControl('', [Validators.required]),
  }, { validators: [this.passwordConfirmationValidator.validate] });

  constructor(
    private passwordConfirmationValidator: PasswordConfirmationValidator,
    private uniqueEmailValidator: UniqueEmailValidator,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>
  ) {}

  ngOnInit() {
    this.invitationToken = this.route.snapshot.params['invitationToken'];
  }

  onSubmit() {
    if (!this.registrationForm.valid) { return; }
    const {
      firstName,
      lastName,
      email,
      jobTitle,
      password,
      passwordConfirmation
    } = this.registrationForm.value;

    this.store.dispatch(AuthActions.registerUserWithInvitationToken({
      invitationToken: this.invitationToken,
      firstName,
      lastName,
      email,
      jobTitle,
      password,
      passwordConfirmation
    }));

    this.registrationForm.get('password').reset();
    this.registrationForm.get('passwordConfirm').reset();
  }

}
