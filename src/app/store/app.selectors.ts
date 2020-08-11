import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromApp from './app.reducer';

export const getEntityById = (id: string) =>
  state => state.entities[id];

export const getEntitiesByIdsList = (ids: number[]) =>
  state => {
    const filteredEntities = ids.reduce((obj, key) => ({ ...obj, [key]: state.entities[key] }), {});
    return Object.keys(filteredEntities).map(key => filteredEntities[key]);
  };

export const selectAppState = createFeatureSelector<fromApp.AppState>('app');

export const selectAppNavigationInProgress = createSelector(
  selectAppState,
  state => state.appNavigationInProgress
);

export const selectLaunchToast = createSelector(
  selectAppState,
  state => state.launchToast
);

export const selectToast = createSelector(
  selectAppState,
  state => state.toast
);
