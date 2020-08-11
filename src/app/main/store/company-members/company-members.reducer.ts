import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { CompanyMember } from '../../models/company-member.model';
import { CompanyMembersActions } from './action-types';
import { AuthActions } from '../../../auth/store/action-types';


export interface CompanyMembersState extends EntityState<CompanyMember> {
  overallEntitiesCount: number;
  currentPageSize: number;
  currentPageNumber: number;
  numberOfEntitiesLoaded: number;
  allIdsListRepr: number[];
  entitiesLoading: boolean;
  singleEntityLoading: boolean;
}

export const adapter = createEntityAdapter<CompanyMember>();

export const initialCompanyMembersState = adapter.getInitialState({
  overallEntitiesCount: 0,
  currentPageSize: 5,
  currentPageNumber: 1,
  numberOfEntitiesLoaded: 0,
  allIdsListRepr: null,
  entitiesLoading: false,
  singleEntityLoading: false
});

export const companyMembersReducer = createReducer(
  initialCompanyMembersState,
  on(CompanyMembersActions.companyMembersPageChanged, (state, { pageNumber }) => ({
    ...state,
    currentPageNumber: pageNumber
  })),
  on(CompanyMembersActions.companyMembersPageSizeChanged, (state, { pageSize }) => ({
    ...state,
    currentPageSize: pageSize
  })),
  on(CompanyMembersActions.companyMembersStartedLoading, state => ({
    ...state,
    entitiesLoading: true
  })),
  on(CompanyMembersActions.companyMembersFinishedLoading, state => ({
    ...state,
    entitiesLoading: false,
  })),
  on(CompanyMembersActions.companyMemberStartedLoading, state => ({
    ...state,
    singleEntityLoading: true
  })),
  on(CompanyMembersActions.companyMemberFinishedLoading, state => ({
    ...state,
    singleEntityLoading: false,
  })),
  on(CompanyMembersActions.companyMembersLoaded, (state, action) =>
    adapter.addMany(action.companyMembers, {
      ...state,
      overallEntitiesCount: action.overallEntitiesCount,
      numberOfEntitiesLoaded: state.numberOfEntitiesLoaded + action.numberOfEntitiesLoaded,
      allIdsListRepr: action.allIdsListRepr,
      currentPageNumber: action.currentPageNumber,
      currentPageSize: action.currentPageSize
    })
  ),
  on(CompanyMembersActions.companyMemberLoaded, (state, { companyMember }) =>
    adapter.addOne(companyMember, state)
  ),
  on(CompanyMembersActions.companyMemberUpdated, (state, { updatedCompanyMember }) =>
    adapter.updateOne(updatedCompanyMember, state)
  ),
  on(CompanyMembersActions.deleteCompanyMember, (state, { companyMemberId }) =>
    adapter.removeOne(companyMemberId, {
      ...state,
      overallEntitiesCount: state.overallEntitiesCount - 1,
      allIdsListRepr: state.allIdsListRepr.filter((id: number) => id !== companyMemberId)
    })
  ),
  on(AuthActions.cleanUpAfterLogout, state =>
    adapter.removeAll({
      ...state,
      overallEntitiesCount: 0,
      currentPageSize: 5,
      currentPageNumber: 1,
      numberOfEntitiesLoaded: 0,
      allIdsListRepr: null,
      entitiesLoading: false,
      singleEntityLoading: false
    })
  )
);
