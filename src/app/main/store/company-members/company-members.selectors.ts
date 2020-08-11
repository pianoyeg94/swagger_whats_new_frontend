import { createFeatureSelector, createSelector } from '@ngrx/store';

import { getEntitiesByIdsList, getEntityById } from '../../../store/app.selectors';
import * as fromCompanyMembers from './company-members.reducer';


export const selectCompanyMembersState =
  createFeatureSelector<fromCompanyMembers.CompanyMembersState>('companyMembers');

export const selectCompanyMembersCurrentPageSize = createSelector(
  selectCompanyMembersState,
  state => state.currentPageSize
);

export const selectCompanyMembersCurrentPageNumber = createSelector(
  selectCompanyMembersState,
  state => state.currentPageNumber
);

export const selectCompanyMembersOverallEntitiesCount = createSelector(
  selectCompanyMembersState,
  state => state.overallEntitiesCount
);

export const selectCompanyMembersIdsListRepr = createSelector(
  selectCompanyMembersState,
  state => state.allIdsListRepr
);

export const selectCompanyMembersByIdsList = (ids: number[]) =>
  createSelector(selectCompanyMembersState, getEntitiesByIdsList(ids));

export const selectCompanyMemberById = (id: string) =>
  createSelector(selectCompanyMembersState, getEntityById(id));

export const selectCompanyMembersLoading = createSelector(
  selectCompanyMembersState,
  state => state.entitiesLoading
);

export const selectCompanyMemberLoading = createSelector(
  selectCompanyMembersState,
  state => state.singleEntityLoading
);

