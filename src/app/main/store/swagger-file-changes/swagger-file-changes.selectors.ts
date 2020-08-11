import { createFeatureSelector, createSelector } from '@ngrx/store';

import { getEntityById } from '../../../store/app.selectors';
import { selectSwaggerProjectById } from '../swagger-projects/swagger-projects.selectors';
import * as fromSwaggerFileChanges from './swagger-file-changes.reducer';
import { SwaggerProject } from '../../models/swagger-project.model';
import { SwaggerFileChange } from '../../models/swagger-file-change.model';


export const selectSwaggerFileChangesState =
  createFeatureSelector<fromSwaggerFileChanges.SwaggerFileChangesState>('swaggerFileChanges');

export const selectSwaggerFileChangeEntities = createSelector(
  selectSwaggerFileChangesState,
  fromSwaggerFileChanges.selectEntities
);

export const selectSwaggerFileChangeById = (id: string) =>
  createSelector(selectSwaggerFileChangesState, getEntityById(id));

export const selectSwaggerFileChangesForSwaggerProject = (id: string) => createSelector(
  selectSwaggerProjectById(id),
  selectSwaggerFileChangeEntities,
  (selectedProject: SwaggerProject,
   swaggerFileChangeEntities: { [key: number]: SwaggerFileChange }
  ): SwaggerFileChange[] => selectedProject
    ? Object.values(selectedProject.swaggerFileChangeIds.reduce(
      (result, key) => ({ ...result, [key]: swaggerFileChangeEntities[key] }), {})
    )
    : undefined
);
