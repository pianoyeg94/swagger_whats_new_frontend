export interface User {
  userId: number;
  email: string;
  firstName: string;
  lastName: string;
  emailConfirmed: boolean;
  companyMembershipId: number;
  companyMembershipPermissions: number;
  isCompanyOwner: boolean;
  jobTitle: string;
  accessToken: string;
  accessTokenExpirationDate: string;
  refreshToken: string;
  refreshTokenExpirationDate: string;
}

