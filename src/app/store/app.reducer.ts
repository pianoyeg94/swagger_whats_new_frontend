import { createReducer, on } from '@ngrx/store';

import { AppActions } from './action-types';


export interface Toast {
  messageType: string;
  position: string;
  message: string;
}

export interface AppState {
  appNavigationInProgress: boolean;
  toast: Toast;
  launchToast: boolean;
}

export const initialAppState: AppState = {
  appNavigationInProgress: false,
  launchToast: false,
  toast: null
};

export const appReducer = createReducer(
  initialAppState,
  on(AppActions.appNavigationStart, state => ({
    ...state,
    appNavigationInProgress: true
  })),
  on(AppActions.appNavigationEnd, state => ({
    ...state,
    appNavigationInProgress: false
  })),
  on(
    AppActions.toastErrorTopRight,
    AppActions.toastSuccessTopRight,
    AppActions.toastErrorTopCenter,
    AppActions.toastSuccessTopCenter,
    (state, action) => ({
      ...state,
      launchToast: true,
      toast: {
        message: action.message,
        messageType: action.messageType,
        position: action.position
      }
    })
  ),
  on(AppActions.silenceToast, state => ({
    ...state,
    launchToast: false,
    toast: null
  }))
);

