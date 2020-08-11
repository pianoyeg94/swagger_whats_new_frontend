import { createAction, props } from '@ngrx/store';

import { RemoteVCSAccount } from '../../models/vcs-account.model';
import { RemoteVCSAccountFromServer, RemoteVCSAccountsResponse } from '../../services/response-models/vcs-accounts-response';
import { handleVCSAccountsFromServer } from './helpers/handle-vcs-accounts-from-server';
import { handleVCSAccountFromServer } from './helpers/handle-vcs-account-from-server';

export const loadVCSAccounts = createAction(
  '[VCS Accounts Resolver] Load VCS Accounts'
);

export const loadVCSAccountsForSwaggerProject = createAction(
  '[Swagger Project Create Component] Load VCS Accounts For Swagger Project'
);

export const vcsAccountsLoaded = createAction(
  '[Load VCS Accounts Effect] VCS Accounts Loaded',
  (
    response: RemoteVCSAccountsResponse
  ): { remoteVCSAccounts: RemoteVCSAccount[] } => handleVCSAccountsFromServer(response)
);

export const loadVcsAccount = createAction(
  '[VCS Account Resolver] Load VCS Account',
  props<{ vcsAccountId: number }>()
);

export const vcsAccountLoaded = createAction(
  '[Load VCS Account Effect] VCS Account Loaded',
  (
    response: RemoteVCSAccountFromServer
  ): { remoteVCSAccount: RemoteVCSAccount } => handleVCSAccountFromServer(response)
);

export const errorLoadingVCSAccount = createAction(
  '[Load VCS Account Effect] Error Loading VCS Account'
);

export const registerVCSAccount = createAction(
  '[Post VCS Account Registration Component] Register VCS Account',
  props<{ remoteVCSAccount: RemoteVCSAccount }>()
);

export const vcsAccountRegistered = createAction(
  '[Register VCS Account Effect] VCS Account Registered',
  (
    response: RemoteVCSAccountFromServer
  ): { remoteVCSAccount: RemoteVCSAccount } => handleVCSAccountFromServer(response)
);

export const errorRegisteringVCSAccount = createAction(
  '[Register VCS Account Effect] Error Registering VCS Account'
);

export const deleteVCSAccount = createAction(
  '[VCS Account Details Component Popup] Delete VCS Account',
  props<{ vcsAccountId: number }>()
);

