export interface AuthResponse {
  'company'?: {
    id: number;
    company_name: string;
    created_at: string;
    updated_at: string;
  };
  user: {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    email_confirmed: boolean;
    company_membership: {
      id: number;
      is_company_owner: boolean;
      job_title: string;
      permissions: number;
    };
    token: {
      refresh: {
        token: string;
        expires_in: number;
      };
      access: {
        token: string;
        expires_in: number;
      };
    };
  };
}
