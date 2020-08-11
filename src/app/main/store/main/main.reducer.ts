import { createReducer, on } from '@ngrx/store';

import { CompanyMembershipPermissions } from '../../models/company-membership-permissions.model';
import { AuthActions } from '../../../auth/store/action-types';
import { MainActions } from './action-types';


export interface MainState {
  pageTitle: string;
  companyMembershipPermissions: CompanyMembershipPermissions;
  userIsAfterCompanyRegistration: boolean;
}

export const initialMainState: MainState = {
  pageTitle: null,
  companyMembershipPermissions: null,
  userIsAfterCompanyRegistration: false
};

export const mainReducer = createReducer(
  initialMainState,
  on(MainActions.ContentChange, (state, { pageTitle }) => ({
    ...state,
    pageTitle
  })),
  on(MainActions.companyMembershipPermissionsLoaded, (state, { companyMembershipPermissions }) => ({
    ...state,
    companyMembershipPermissions
  })),
  on(MainActions.notifyUserIsAfterCompanyRegistration, state => ({
    ...state,
    userIsAfterCompanyRegistration: true
  })),
  on(MainActions.notifyUserLeftEmailConfirmationHintPage, state => ({
    ...state,
    userIsAfterCompanyRegistration: false
  })),
  on(AuthActions.cleanUpAfterLogout, state => ({
    ...state,
    pageTitle: null,
    companyMembershipPermissions: null
  }))
);
