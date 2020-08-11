import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CompanyRoutingModule } from './company-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CompanyMembersListComponent } from './components/pages/company-members-list/company-members-list.component';
import { CompanyMemberInvitationComponent } from './components/pages/company-member-invitation/company-member-invitation.component';
import { CompanyMemberDetailsComponent } from './components/pages/company-member-details/company-member-details.component';


@NgModule({
  declarations: [
    CompanyMembersListComponent,
    CompanyMemberInvitationComponent,
    CompanyMemberDetailsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    CompanyRoutingModule,
    SharedModule
  ]
})
export class CompanyModule {}
