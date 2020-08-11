import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { handleCompanyMembersFromServer } from './helpers/handle-company-members-from-server';
import { handleCompanyMemberFromServer } from './helpers/handle-company-member-from-server';
import { CompanyMemberFromServer, CompanyMembersResponse } from '../../services/response-models/company-members-response';
import { CompanyMember } from '../../models/company-member.model';


export const companyMembersPageChanged = createAction(
  '[Company Members List Component] Company Members Page Changed',
  props<{ pageNumber: number }>()
);

export const companyMembersPageSizeChanged = createAction(
  '[Company Members List Component] Company Members Page Size Changed',
  props<{ pageSize: number }>()
);

export const companyMembersStartedLoading = createAction(
  '[Company Members Resolver] Company Members Started Loading'
);

export const companyMembersFinishedLoading = createAction(
  '[Load Company Members Effect] Company Members Finished Loading'
);

export const loadCompanyMembers = createAction(
  '[Company Members Resolver] Load Company Members',
  props<{ pageNumber: number, pageSize: number, allIdsListRepr: number[] }>()
);

export const companyMembersLoaded = createAction(
  '[Load Company Members Effect] Company Members Loaded',
  (
    response: CompanyMembersResponse,
    pageNumber: number,
    pageSize: number,
    allIdsListRepr: number[]
  ) => handleCompanyMembersFromServer(response, pageNumber, pageSize, allIdsListRepr)
);

export const errorLoadingCompanyMembers = createAction(
  '[Load Company Members Effect] Error Loading Company Members'
);

export const companyMemberStartedLoading = createAction(
  '[Company Member Resolver] Company Member Started Loading'
);

export const companyMemberFinishedLoading = createAction(
  '[Load Company Member Effect] Company Member Finished Loading'
);

export const loadCompanyMember = createAction(
  '[Company Member / Swagger Project Owner Resolver] Load Company Member',
  props<{ companyMemberId: number }>()
);

export const companyMemberLoaded = createAction(
  '[Load Company Member Effect] Company Member Loaded',
  (
    response: CompanyMemberFromServer
  ): { companyMember: CompanyMember } => handleCompanyMemberFromServer(response)
);

export const errorLoadingCompanyMember = createAction(
  '[Load Company Member Effect] Error Loading Company Member'
);

export const inviteCompanyMember = createAction(
  '[Company Member Invitation Component] Invite Company Member',
  props<{ email: string, companyMembershipPermissions: number }>()
);

export const updateCompanyMember = createAction(
  '[Company Member Details Page] Update Company Member',
  props<{ companyMembershipPermissions: number, companyMemberId: number }>()
);

export const companyMemberUpdated = createAction(
  '[Update Company Member Effect] Company Member Updated',
  (
    response: { id: number, permissions: number }
  ): { updatedCompanyMember: Update<CompanyMember> } => ({
    updatedCompanyMember: {
      id: response.id,
      changes: {
        permissions: response.permissions
      }
    }
  })
);

export const deleteCompanyMember = createAction(
  '[Company Member Details Page] Delete Company Member',
  props<{ companyMemberId: number }>()
);

