import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CompanyMembersResolver } from './resolvers/company-members.resolver';
import { CompanyMemberResolver } from './resolvers/company-member.resolver';
import { CompanyMemberInvitationComponent } from './components/pages/company-member-invitation/company-member-invitation.component';
import { CompanyMembersListComponent } from './components/pages/company-members-list/company-members-list.component';
import { UserProfileDetailsGuard } from '../../guards/user-profile-details.guard';
import { HasEmailConfirmedGuard } from '../../guards/has-email-confirmed.guard';
import { HasCompanyMembershipPermissionsGuard } from '../../guards/has-permissions.guard';
import { CompanyMemberDetailsComponent } from './components/pages/company-member-details/company-member-details.component';


const routes: Routes = [
  {
    path: '',
    component: CompanyMembersListComponent,
    resolve: {
      companyMembers: CompanyMembersResolver
    }
  },
  {
    path: 'invitation',
    component: CompanyMemberInvitationComponent,
    canActivate: [HasCompanyMembershipPermissionsGuard, HasEmailConfirmedGuard],
    data: {
      companyMembershipPermission: 'inviteNewUsers',
      redirectOnAccessDeniedUrl: '/company'
    }
  },
  {
    path: 'users/:memberId',
    canActivate: [UserProfileDetailsGuard],
    component: CompanyMemberDetailsComponent,
    resolve: {
      companyMember: CompanyMemberResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule {}
