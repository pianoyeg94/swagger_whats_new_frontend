export interface CompanyMemberProfileFromServer {
  id: number;
  phone_number: string;
  skype: string;
  profile_photo: string;
}

export interface CompanyMemberFromServer {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  company_membership: {
    id: number;
    is_company_owner: boolean;
    job_title: string;
    permissions: number;
  };
  profile: CompanyMemberProfileFromServer;
}

export interface CompanyMembersResponse {
  count: number;
  next: string;
  previous: string;
  results: CompanyMemberFromServer[];
}
