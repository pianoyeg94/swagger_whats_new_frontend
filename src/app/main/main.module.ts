import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { AppRoutingModule } from '../app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainSideNavComponent } from './components/main-side-nav/main-side-nav.component';
import { SecondarySideNavComponent } from './components/secondary-side-nav/secondary-side-nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { EmailConfirmationHintComponent } from './components/email-confirmation-hint/email-confirmation-hint.component';

import { MainEffects } from './store/main/main.effects';
import * as fromMain from './store/main/main.reducer';
import { CompanyEffects } from './store/company/company.effects';
import * as fromCompany from './store/company/company.reducer';
import { CompanyMembersEffects } from './store/company-members/company-members.effects';
import * as fromCompanyMembers from './store/company-members/company-members.reducer';
import { SwaggerFileChangesEffects } from './store/swagger-file-changes/swagger-file-changes.effects';
import * as fromSwaggerFileChanges from './store/swagger-file-changes/swagger-file-changes.reducer';
import { SwaggerProjectsEffects } from './store/swagger-projects/swagger-projects.effects';
import * as fromSwaggerProjects from './store/swagger-projects/swagger-projects.reducer';
import { UserProfileEffects } from './store/user-profile/user-profile.effects';
import * as fromUserProfile from './store/user-profile/user-profile.reducer';
import { VCSAccountsEffects } from './store/vcs-accounts/vcs-accounts.effects';
import * as fromVCSAccounts from './store/vcs-accounts/vcs-accounts.reducer';


@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    MainSideNavComponent,
    SecondarySideNavComponent,
    FooterComponent,
    MainContentComponent,
    EmailConfirmationHintComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,

    StoreModule.forFeature('main', fromMain.mainReducer),
    EffectsModule.forFeature([MainEffects]),
    StoreModule.forFeature('company', fromCompany.companyReducer),
    EffectsModule.forFeature([CompanyEffects]),
    StoreModule.forFeature('companyMembers', fromCompanyMembers.companyMembersReducer),
    EffectsModule.forFeature([CompanyMembersEffects]),
    StoreModule.forFeature('swaggerFileChanges', fromSwaggerFileChanges.swaggerFileChangesReducer),
    EffectsModule.forFeature([SwaggerFileChangesEffects]),
    StoreModule.forFeature('swaggerProjects', fromSwaggerProjects.swaggerProjectsReducer),
    EffectsModule.forFeature([SwaggerProjectsEffects]),
    StoreModule.forFeature('userProfile', fromUserProfile.userProfileReducer),
    EffectsModule.forFeature([UserProfileEffects]),
    StoreModule.forFeature('vcsAccounts', fromVCSAccounts.vcsAccountsReducer),
    EffectsModule.forFeature([VCSAccountsEffects])
  ],
  exports: [LayoutComponent]
})
export class MainModule {}
