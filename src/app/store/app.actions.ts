import { createAction } from '@ngrx/store';


export const toastTypeError = 'Error';
export const toastTypeSuccess = 'Success';
export const toastPositionTopRight = 'Top Right';
export const toastPositionTopCenter = 'Top Center';

export const appNavigationStart = createAction('[App Component] App Navigation Started');

export const appNavigationEnd = createAction('[App Component] App Navigation Ended');

export const silenceToast = createAction('[Main App Component] Silence Toast');

export const dummyAction = createAction('[Anywhere In the App] Dummy Action');

export const toastSuccessTopRight = createAction(
  '[Any Effect Within The App] Trigger a Success Toast - Top Right Corner',
  (message: string, messageType = toastTypeSuccess, position = toastPositionTopRight) => ({
    message,
    messageType,
    position
  })
);

export const toastErrorTopRight = createAction(
  '[Any Effect Within The App] Trigger an Error Toast - Top Right Corner',
  (message: string, messageType = toastTypeError, position = toastPositionTopRight) => ({
    message,
    messageType,
    position
  })
);

export const toastSuccessTopCenter = createAction(
  '[Any Effect Within The App] Trigger a Success Toast - Top Center',
  (message: string, messageType = toastTypeSuccess, position = toastPositionTopCenter) => ({
    message,
    messageType,
    position
  })
);

export const toastErrorTopCenter = createAction(
  '[Any Effect Within The App] Trigger an Error Toast - Top Center',
  (message: string, messageType = toastTypeError, position = toastPositionTopCenter) => ({
    message,
    messageType,
    position
  })
);
