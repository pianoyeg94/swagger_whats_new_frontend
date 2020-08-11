import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VCSAccountsListComponent } from './components/pages/vcs-accounts-list/vcs-accounts-list.component';
import { VCSAccountRegistrationComponent } from './components/pages/vcs-account-registration/vcs-account-registration.component';
import { VCSAccountDetailComponent } from './components/pages/vcs-account-detail/vcs-account-detail.component';
import { HasCompanyMembershipPermissionsGuard } from '../../guards/has-permissions.guard';
import { PostVCSAccountRegistrationComponent } from './components/post-vcs-account-registration/post-vcs-account-registration.component';
import { VCSAccountResolver } from './resolvers/vcs-account.resolver';
import { VCSAccountsResolver } from './resolvers/vcs-accounts.resolver';


const routes: Routes = [
  {
    path: '',
    component: VCSAccountsListComponent,
    resolve: {
      vcsAccounts: VCSAccountsResolver
    }
  },
  {
    path: 'register',
    component: VCSAccountRegistrationComponent,
    canActivate: [HasCompanyMembershipPermissionsGuard],
    data: {
      companyMembershipPermission: 'registerVcsAccounts',
      redirectOnAccessDeniedUrl: '/vcs-accounts'
    }
  },
  {
    path: 'post-registration',
    component: PostVCSAccountRegistrationComponent
  },
  {
    path: ':id',
    component: VCSAccountDetailComponent,
    resolve: {
      vcsAccount: VCSAccountResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VcsAccountsRoutingModule {}
