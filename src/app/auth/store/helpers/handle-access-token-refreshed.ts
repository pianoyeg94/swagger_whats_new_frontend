import { AccessTokenRefreshResponse } from '../../services/response-models/access-token-refresh-response';
import { localStorageGetDecryptedObject, localStorageSetEncryptedObject } from '../../../utils/local-storage-encryption';
import { User } from '../../models/user.model';


export const handleAccessTokenRefreshed = (response: AccessTokenRefreshResponse) => {
  const accessToken = response.access;
  const accessTokenExpirationDate = new Date(
    new Date().getTime() + response.expires_in
  ).toString();

  const userData = localStorageGetDecryptedObject<User>('userData');
  userData.accessToken = accessToken;
  userData.accessTokenExpirationDate = accessTokenExpirationDate;
  localStorageSetEncryptedObject('userData', userData);

  return { accessToken, accessTokenExpirationDate };
};
