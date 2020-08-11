import { createFeatureSelector, createSelector } from '@ngrx/store';

import * as fromSwaggerProjects from './swagger-projects.reducer';
import { getEntitiesByIdsList, getEntityById } from '../../../store/app.selectors';


export const selectSwaggerProjectsState =
  createFeatureSelector<fromSwaggerProjects.SwaggerProjectState>('swaggerProjects');

export const selectSwaggerProjectsCurrentPageSize = createSelector(
  selectSwaggerProjectsState,
  state => state.currentPageSize
);

export const selectSwaggerProjectsCurrentPageNumber = createSelector(
  selectSwaggerProjectsState,
  state => state.currentPageNumber
);

export const selectSwaggerProjectsOverallEntitiesCount = createSelector(
  selectSwaggerProjectsState,
  state => state.overallEntitiesCount
);

export const selectSwaggerProjectIdsListRepr = createSelector(
  selectSwaggerProjectsState,
  state => state.allIdsListRepr
);

export const selectSwaggerProjectsLoading = createSelector(
  selectSwaggerProjectsState,
  state => state.entitiesLoading
);

export const selectSwaggerProjectLoading = createSelector(
  selectSwaggerProjectsState,
  state => state.singleEntityLoading
);

export const selectSwaggerProjectsByIdsList = (ids: number[]) =>
  createSelector(selectSwaggerProjectsState, getEntitiesByIdsList(ids));

export const selectSwaggerProjectById = (id: string) =>
  createSelector(selectSwaggerProjectsState, getEntityById(id));
