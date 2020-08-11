import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import { AuthActions } from '../../store/action-types';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent {
  passwordResetEmailSent = false;

  forgotPasswordForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ])
  });

  constructor(private store: Store<fromApp.AppState>) {}

  onSubmit() {
    if (!this.forgotPasswordForm.valid) { return; }
    const { email } = this.forgotPasswordForm.value;
    this.store.dispatch(AuthActions.sendPasswordResetEmail({ email }));
    this.passwordResetEmailSent = true;
  }
}
