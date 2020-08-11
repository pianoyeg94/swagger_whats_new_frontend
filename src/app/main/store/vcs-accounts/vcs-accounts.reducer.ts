import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { RemoteVCSAccount } from '../../models/vcs-account.model';
import { RemoteVCSAccountsActions } from './action-types';
import { AuthActions } from '../../../auth/store/action-types';


export interface VCSAccountsState extends EntityState<RemoteVCSAccount> {
  vcsAccountsLoaded: boolean;
}

export const adapter = createEntityAdapter<RemoteVCSAccount>();

export const initialVCSAccountsState = adapter.getInitialState({
  vcsAccountsLoaded: false
});

export const { selectAll } = adapter.getSelectors();

export const vcsAccountsReducer = createReducer(
  initialVCSAccountsState,
  on(RemoteVCSAccountsActions.vcsAccountsLoaded, (state, action) =>
    adapter.setAll(action.remoteVCSAccounts, {
      ...state,
      vcsAccountsLoaded: true
    })
  ),
  on(RemoteVCSAccountsActions.vcsAccountLoaded, (state, { remoteVCSAccount }) =>
    adapter.addOne(remoteVCSAccount, state)
  ),
  on(RemoteVCSAccountsActions.vcsAccountRegistered, (state, { remoteVCSAccount }) =>
    adapter.addOne(remoteVCSAccount, state)
  ),
  on(RemoteVCSAccountsActions.deleteVCSAccount, (state, { vcsAccountId }) =>
    adapter.removeOne(vcsAccountId, state)
  ),
  on(AuthActions.cleanUpAfterLogout, state =>
    adapter.removeAll({
      ...state,
      vcsAccountsLoaded: false
    })
  )
);

