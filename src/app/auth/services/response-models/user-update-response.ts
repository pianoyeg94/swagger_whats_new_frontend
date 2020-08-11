export interface UserUpdateResponse {
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
  email_confirmed: boolean;
}

