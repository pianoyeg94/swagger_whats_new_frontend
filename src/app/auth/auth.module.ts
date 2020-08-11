import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';


import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CompanyRegistrationComponent } from './components/company-registration/company-registration.component';
import { LoginComponent } from './components/login/login.component';
import { EmailConfirmationComponent } from './components/email-confirmation/email-confirmation.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { InvitationBasedRegistrationComponent } from './components/invitation-based-registration/invitation-based-registration.component';
import * as fromAuth from './store/auth.reducer';
import { AuthEffects } from './store/auth.effects';


@NgModule({
  declarations: [
    CompanyRegistrationComponent,
    LoginComponent,
    EmailConfirmationComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    InvitationBasedRegistrationComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    StoreModule.forFeature('auth', fromAuth.authReducer),
    EffectsModule.forFeature([AuthEffects])
  ],
  exports: [
    CompanyRegistrationComponent,
    LoginComponent,
    EmailConfirmationComponent,
    ResetPasswordComponent,
    ForgotPasswordComponent,
    InvitationBasedRegistrationComponent
  ]
})
export class AuthModule {
}
