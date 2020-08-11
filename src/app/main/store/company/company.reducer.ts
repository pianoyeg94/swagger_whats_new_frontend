import { createReducer, on } from '@ngrx/store';

import { Company } from '../../models/company.model';
import { CompanyActions } from './action-types';
import { AuthActions } from '../../../auth/store/action-types';


export interface CompanyState {
  company: Company;
}

export const initialCompanyState = {
  company: null
};

export const companyReducer = createReducer(
  initialCompanyState,
  on(
    CompanyActions.companyDetailsLoaded,
    CompanyActions.companyDetailsUpdated,
    (state, { company }) => ({
      ...state,
      company
    })
  ),
  on(AuthActions.cleanUpAfterLogout, state => ({
    ...state,
    company: null
  }))
);
