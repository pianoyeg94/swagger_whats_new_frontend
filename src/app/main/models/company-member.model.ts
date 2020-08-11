import { UserProfile } from './user-profile.model';

export interface CompanyMember {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  companyMembershipId: number;
  isCompanyOwner: boolean;
  jobTitle: string;
  permissions: number;
  profile: UserProfile;
}


