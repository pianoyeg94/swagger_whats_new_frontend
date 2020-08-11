import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromCompany from './company.reducer';

export const selectCompanyState =
  createFeatureSelector<fromCompany.CompanyState>('company');

export const selectCompanyDetails = createSelector(
  selectCompanyState,
  state => state.company
);
