import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CustomPreloadingStrategyService } from './custom-preloading-strategy.service';
import { CompanyRegistrationComponent } from './auth/components/company-registration/company-registration.component';
import { IsNotLoggedInGuard } from './guards/is-not-logged-in.guard';
import { IsInvitedGuard } from './guards/is-invited.guard';
import { InvitationBasedRegistrationComponent } from './auth/components/invitation-based-registration/invitation-based-registration.component';
import { LoginComponent } from './auth/components/login/login.component';
import { ForgotPasswordComponent } from './auth/components/forgot-password/forgot-password.component';
import { PasswordResetGuard } from './guards/password-reset.guard';
import { ResetPasswordComponent } from './auth/components/reset-password/reset-password.component';
import { EmailConfirmationComponent } from './auth/components/email-confirmation/email-confirmation.component';
import { UserProfileResolver } from './main/resolvers/user-profile.resolver';
import { CompanyResolver } from './main/resolvers/company.resolver';
import { AuthGuard } from './guards/auth.guard';
import { LayoutComponent } from './main/components/layout/layout.component';
import { CompanyMembershipPermissionsResolver } from './main/resolvers/company-membership-permissions.resolver';
import { EmailConfirmationHintGuard } from './guards/email-confirmation-hint.guard';
import { EmailConfirmationHintComponent } from './main/components/email-confirmation-hint/email-confirmation-hint.component';


const routes: Routes = [
  { path: '', redirectTo: 'swagger-projects', pathMatch: 'full' },
  {
    path: '',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    resolve: {
      userProfile: UserProfileResolver,
      company: CompanyResolver,
      companyMembershipPermissions: CompanyMembershipPermissionsResolver
    },
    children: [
      {
        path: 'swagger-projects',
        loadChildren: () => import('./main/swagger-projects/swagger-projects.module').then(
          m => m.SwaggerProjectsModule
        ),
        data: { preload: true }
      },
      {
        path: 'vcs-accounts',
        loadChildren: () => import('./main/vcs-accounts/vcs-accounts.module').then(
          m => m.VCSAccountsModule
        )
      },
      {
        path: 'company',
        loadChildren: () => import('./main/company/company.module').then(
          m => m.CompanyModule
        )
      },
      {
        path: 'my-profile',
        loadChildren: () => import('./main/user-profile/user-profile.module').then(
          m => m.UserProfileModule
        )
      },
      {
        path: 'get-help',
        loadChildren: () => import('./main/get-help/get-help.module').then(
          m => m.GetHelpModule
        )
      },
      {
        path: 'confirm-email-info',
        component: EmailConfirmationHintComponent,
        canActivate: [EmailConfirmationHintGuard]
      }
    ]
  },
  {
    path: 'register',
    canActivate: [IsNotLoggedInGuard],
    component: CompanyRegistrationComponent
  },
  {
    path: 'register/:invitationToken',
    canActivate: [IsNotLoggedInGuard, IsInvitedGuard],
    component: InvitationBasedRegistrationComponent
  },
  {
    path: 'login',
    canActivate: [IsNotLoggedInGuard],
    component: LoginComponent
  },
  {
    path: 'forgot-password',
    canActivate: [IsNotLoggedInGuard],
    component: ForgotPasswordComponent
  },
  {
    path: 'reset-password/:resetToken',
    canActivate: [IsNotLoggedInGuard, PasswordResetGuard],
    component: ResetPasswordComponent
  },
  {
    path: 'email-confirm/:confirmationToken',
    component: EmailConfirmationComponent
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: CustomPreloadingStrategyService
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
