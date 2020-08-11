import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromMain from './main.reducer';


export const selectMainState =
  createFeatureSelector<fromMain.MainState>('main');

export const selectPageTitle = createSelector(
  selectMainState,
  state => state.pageTitle
);

export const selectCompanyMembershipPermissions = createSelector(
  selectMainState,
  state => state.companyMembershipPermissions
);

export const selectIsUserAfterCompanyRegistration = createSelector(
  selectMainState,
  state => state.userIsAfterCompanyRegistration
);
