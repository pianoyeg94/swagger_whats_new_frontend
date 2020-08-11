import { UserProfileResponse } from '../../../services/response-models/user-profile-response';


export const handleUserProfileFromServer = (response: UserProfileResponse) => ({
  userProfile: {
    userProfileId: response.id,
    skype: response.skype,
    phoneNumber: response.phone_number,
    profilePhotoUrl: response.profile_photo
  }
});
