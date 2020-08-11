import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { VcsAccountsRoutingModule } from './vcs-accounts-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { PostVCSAccountRegistrationComponent } from './components/post-vcs-account-registration/post-vcs-account-registration.component';
import { VCSAccountsListComponent } from './components/pages/vcs-accounts-list/vcs-accounts-list.component';
import { VCSAccountRegistrationComponent } from './components/pages/vcs-account-registration/vcs-account-registration.component';
import { VCSAccountDetailComponent } from './components/pages/vcs-account-detail/vcs-account-detail.component';


@NgModule({
  declarations: [
    PostVCSAccountRegistrationComponent,
    VCSAccountsListComponent,
    VCSAccountRegistrationComponent,
    VCSAccountDetailComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    VcsAccountsRoutingModule,
    SharedModule,
  ]
})
export class VCSAccountsModule {}
