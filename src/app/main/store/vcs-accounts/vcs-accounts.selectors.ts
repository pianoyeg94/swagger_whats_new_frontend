import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromVCSAccounts from './vcs-accounts.reducer';
import { getEntityById } from '../../../store/app.selectors';


export const selectVCSAccountsState =
  createFeatureSelector<fromVCSAccounts.VCSAccountsState>('vcsAccounts');

export const selectVCSAccounts = createSelector(
  selectVCSAccountsState,
  fromVCSAccounts.selectAll
);

export const selectAreVCSAccountsLoaded = createSelector(
  selectVCSAccountsState,
  state => state.vcsAccountsLoaded
);

export const selectVCSAccountById = (id: string) =>
  createSelector(selectVCSAccountsState, getEntityById(id));
