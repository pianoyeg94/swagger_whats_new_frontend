import { User } from '../../models/user.model';
import { AuthResponse } from '../../services/response-models/auth-response';
import { localStorageSetEncryptedObject } from '../../../utils/local-storage-encryption';

export const handleAuthSuccess = (authResponse: AuthResponse) => {
  const accessTokenExpirationDate = new Date(
    new Date().getTime() + authResponse.user.token.access.expires_in
  ).toString();

  const refreshTokenExpirationDate = new Date(
    new Date().getTime() + authResponse.user.token.refresh.expires_in
  ).toString();

  const user: User = {
    userId: authResponse.user.id,
    email: authResponse.user.email,
    firstName: authResponse.user.first_name,
    lastName: authResponse.user.last_name,
    emailConfirmed: authResponse.user.email_confirmed,
    companyMembershipId: authResponse.user.company_membership.id,
    companyMembershipPermissions: authResponse.user.company_membership.permissions,
    isCompanyOwner: authResponse.user.company_membership.is_company_owner,
    jobTitle: authResponse.user.company_membership.job_title,
    accessToken: authResponse.user.token.access.token,
    accessTokenExpirationDate,
    refreshToken: authResponse.user.token.refresh.token,
    refreshTokenExpirationDate
  };

  localStorageSetEncryptedObject('userData', user);
  return { user };
};
