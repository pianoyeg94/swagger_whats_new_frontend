import {
  localStorageGetDecryptedObject,
  localStorageSetEncryptedObject
} from '../../../utils/local-storage-encryption';
import { User } from '../../models/user.model';
import { UserUpdateResponse } from '../../services/response-models/user-update-response';


export const handlePartialUserFromServer = (response: UserUpdateResponse) => {
  const user: Partial<User> = {
    email: response.email,
    firstName: response.first_name,
    lastName: response.last_name,
    jobTitle: response.company_membership.job_title,
    emailConfirmed: response.email_confirmed
  };

  const userData = localStorageGetDecryptedObject<User>('userData');
  userData.email = response.email;
  userData.firstName = response.first_name;
  userData.lastName = response.last_name;
  userData.jobTitle = response.company_membership.job_title;
  localStorageSetEncryptedObject('userData', userData);

  return { user };
};



