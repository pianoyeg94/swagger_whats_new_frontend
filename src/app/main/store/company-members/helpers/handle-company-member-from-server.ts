import { CompanyMemberFromServer } from '../../../services/response-models/company-members-response';
import { CompanyMember } from '../../../models/company-member.model';


export const handleCompanyMemberFromServer = (response: CompanyMemberFromServer) => {
  const companyMember: CompanyMember = {
    id: response.id,
    email: response.email,
    firstName: response.first_name,
    lastName: response.last_name,
    companyMembershipId: response.company_membership.id,
    isCompanyOwner: response.company_membership.is_company_owner,
    jobTitle: response.company_membership.job_title,
    permissions: response.company_membership.permissions,
    profile: {
      userProfileId: response.profile.id,
      phoneNumber: response.profile.phone_number,
      skype: response.profile.skype,
      profilePhotoUrl: response.profile.profile_photo
    }
  };
  return { companyMember };
};
