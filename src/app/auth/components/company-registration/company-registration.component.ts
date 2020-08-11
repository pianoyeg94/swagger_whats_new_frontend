import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import { UniqueEmailValidator } from '../../../validators/unique-email.validator';
import { PasswordConfirmationValidator } from '../../../validators/password-confirmation.validator';
import { UniqueCompanyNameValidator } from '../../../validators/unique-company-name.validator';
import { AuthActions } from '../../store/action-types';


@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.scss']
})
export class CompanyRegistrationComponent {

  standardValidators = [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(30)
  ];

  registrationForm = new FormGroup({
    companyName: new FormControl('', this.standardValidators, [
      this.uniqueCompanyNameValidator.validate
    ]),
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
    private uniqueCompanyNameValidator: UniqueCompanyNameValidator,
    private store: Store<fromApp.AppState>
  ) {}

  onSubmit() {
    if (!this.registrationForm.valid) {
      this.registrationForm.get('password').reset();
      this.registrationForm.get('passwordConfirm').reset();
      return;
    }

    const {
      companyName,
      firstName,
      lastName,
      email,
      jobTitle,
      password,
      passwordConfirmation
    } = this.registrationForm.value;

    this.store.dispatch(AuthActions.registerNewCompanyAndUser({
      companyName,
      firstName,
      lastName,
      email,
      jobTitle,
      password,
      passwordConfirmation
    }));
  }
}
