import { createAction, props } from '@ngrx/store';
import { CompanyMembershipPermissionsResponse } from '../../services/main-http.service';
import { CompanyMembershipPermissions } from '../../models/company-membership-permissions.model';


export const ContentChange = createAction(
  '[Main Page Content Container] Content Change',
  props<{ pageTitle: string }>()
);

export const loadCompanyMembershipPermissions = createAction(
  '[Company Membership Permissions Resolver] Load Company Membership Permissions'
);

export const companyMembershipPermissionsLoaded = createAction(
  '[Load Company Membership Permissions Effect] Company Membership Permissions Loaded',
  (
    response: CompanyMembershipPermissionsResponse
  ): { companyMembershipPermissions: CompanyMembershipPermissions } => ({
    companyMembershipPermissions: {
      registerVcsAccounts: response.register_vcs_accounts,
      createSwaggerProjects: response.create_swagger_projects,
      inviteNewUsers: response.invite_new_users
    }
  })
);

export const notifyUserIsAfterCompanyRegistration = createAction(
  '[Auth Company And User Registration Effect] Notify that a User Just Passed Company Registration'
);

export const notifyUserLeftEmailConfirmationHintPage = createAction(
  '[Email Confirmation Hint Component] Notify that a User Just Left the Email Confirmation Hint Page'
);

