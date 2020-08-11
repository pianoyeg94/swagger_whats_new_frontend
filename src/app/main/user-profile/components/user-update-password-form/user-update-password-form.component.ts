import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../store/app.reducer';
import { AuthActions } from '../../../../auth/store/action-types';
import { PasswordConfirmationValidator } from '../../../../validators/password-confirmation.validator';


@Component({
  selector: 'app-user-update-password-form',
  templateUrl: './user-update-password-form.component.html',
  styleUrls: ['./user-update-password-form.component.scss']
})
export class UserUpdatePasswordFormComponent implements OnInit {

  updateUserPasswordForm = new FormGroup({
    currentPassword: new FormControl('', [Validators.required]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30)
    ]),
    passwordConfirmation: new FormControl('', [Validators.required])
  }, { validators: [this.passwordConfirmationValidator.validate] });

  constructor(
    private store: Store<fromApp.AppState>,
    private passwordConfirmationValidator: PasswordConfirmationValidator,
  ) {}

  ngOnInit() {
  }

  onSubmit() {
    if (!this.updateUserPasswordForm.valid) { return; }

    const { password, passwordConfirmation, currentPassword } = this.updateUserPasswordForm.value;
    this.store.dispatch(AuthActions.updateUserPassword({
      currentPassword,
      newPassword: password,
      passwordConfirm: passwordConfirmation
    }));

    this.updateUserPasswordForm.reset();
  }
}
