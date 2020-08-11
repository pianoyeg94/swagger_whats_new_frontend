import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { UserProfileRoutingModule } from './user-profile-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserProfileFormComponent } from './components/user-profile-form/user-profile-form.component';
import { UserUpdatePasswordFormComponent } from './components/user-update-password-form/user-update-password-form.component';
import { UserUpdateFormComponent } from './components/user-update-form/user-update-form.component';
import { UserCompanyDetailsFormComponent } from './components/user-company-details-form/user-company-details-form.component';
import { UserProfileMainComponent } from './components/pages/user-profile-main/user-profile-main.component';


@NgModule({
  declarations: [
    UserProfileFormComponent,
    UserUpdatePasswordFormComponent,
    UserUpdateFormComponent,
    UserCompanyDetailsFormComponent,
    UserProfileMainComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    UserProfileRoutingModule,
    SharedModule
  ]
})
export class UserProfileModule {}
