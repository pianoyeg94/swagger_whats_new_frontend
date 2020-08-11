import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import { AuthActions } from '../../store/action-types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(50)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(20)
    ])
  });

  constructor(private store: Store<fromApp.AppState>) {}

  onSubmit() {
    if (!this.loginForm.valid) { return; }
    const { email, password } = this.loginForm.value;
    this.store.dispatch(AuthActions.logUserIn({ email, password }));
    this.loginForm.reset();
  }
}
