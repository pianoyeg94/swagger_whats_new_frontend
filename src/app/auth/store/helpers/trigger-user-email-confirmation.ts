import { AuthActions } from '../action-types';
import { AppActions } from '../../../store/action-types';

export const triggerUserEmailConfirmation = () => {
  const emailConfirmationTokenDict = localStorage.getItem('emailConfirmationToken');
  if (emailConfirmationTokenDict) {
    const { token, timestamp } = JSON.parse(emailConfirmationTokenDict);
    localStorage.removeItem('emailConfirmationToken');
    if (new Date() < new Date(timestamp)) {
      return AuthActions.confirmUserEmail({ emailConfirmationToken: token });
    }
  }
  // If reached, conditions were not met
  return AppActions.dummyAction();
};


