import { createAction, props } from '@ngrx/store';

import { CompanyResponse } from '../../services/response-models/company-response';
import { Company } from '../../models/company.model';
import { handleCompanyDetailsFromServer } from './helpers/handle-company-from-server';

export const loadCompanyDetails = createAction(
  '[Company Resolver] Load Company Details'
);

export const companyDetailsLoaded = createAction(
  '[Company Load Company Details Effect] Company Details Loaded',
  (response: CompanyResponse): { company: Company } => handleCompanyDetailsFromServer(response)
);

export const updateCompanyDetails = createAction(
  '[User Profile Main Component] Update Company Details',
  props<{ companyName: string }>()
);

export const companyDetailsUpdated = createAction(
  '[Update Company Details Effect] Company Details Updated',
  (response: CompanyResponse): { company: Company } => handleCompanyDetailsFromServer(response)
);

export const deleteCompany = createAction(
  '[User Profile Main Component] Delete Company',
);
