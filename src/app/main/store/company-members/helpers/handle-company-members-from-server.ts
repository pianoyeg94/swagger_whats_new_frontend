import { CompanyMembersResponse } from '../../../services/response-models/company-members-response';
import { CompanyMember } from '../../../models/company-member.model';


export const handleCompanyMembersFromServer = (
  response: CompanyMembersResponse,
  pageNumber: number,
  pageSize: number,
  allIdsListRepr: number[]
) => {
  const companyMembers: CompanyMember[] = [];
  const ids = [];

  for (const member of response.results) {
    ids.push(member.id);
    companyMembers.push({
      id: member.id,
      email: member.email,
      firstName: member.first_name,
      lastName: member.last_name,
      companyMembershipId: member.company_membership.id,
      isCompanyOwner: member.company_membership.is_company_owner,
      jobTitle: member.company_membership.job_title,
      permissions: member.company_membership.permissions,
      profile: {
        userProfileId: member.profile.id,
        phoneNumber: member.profile.phone_number,
        skype: member.profile.skype,
        profilePhotoUrl: member.profile.profile_photo
      }
    });
  }

  const from = (pageNumber - 1) * pageSize;
  allIdsListRepr = allIdsListRepr === null
    ? new Array(response.count).fill(null)
    : [...allIdsListRepr];
  allIdsListRepr.splice(from, pageSize, ...ids);

  return {
    companyMembers,
    overallEntitiesCount: response.count,
    numberOfEntitiesLoaded: companyMembers.length,
    currentPageNumber: pageNumber,
    currentPageSize: pageSize,
    allIdsListRepr
  };
};
