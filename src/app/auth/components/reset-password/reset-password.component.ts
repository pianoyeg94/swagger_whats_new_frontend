import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import { AuthActions } from '../../store/action-types';
import { PasswordConfirmationValidator } from '../../../validators/password-confirmation.validator';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  resetToken: string;

  resetPasswordForm = new FormGroup({
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(30)
    ]),
    passwordConfirmation: new FormControl('', [Validators.required])
  }, { validators: [this.passwordConfirmationValidator.validate] });

  constructor(
    private passwordConfirmationValidator: PasswordConfirmationValidator,
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.resetToken = this.route.snapshot.params['resetToken'];
  }

  onSubmit() {
    if (!this.resetPasswordForm.valid) { return; }
    const { password, passwordConfirmation } = this.resetPasswordForm.value;
    this.store.dispatch(AuthActions.resetUserPassword({
      password,
      passwordConfirmation,
      resetToken: this.resetToken
    }));
  }
}
