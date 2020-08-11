import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { SwaggerProjectFromServer, SwaggerProjectsResponse } from '../../services/response-models/swagger-projects-response';
import { SwaggerProject } from '../../models/swagger-project.model';
import { SwaggerFileChangeFromServer } from '../../services/response-models/swagger-file-changes-response';
import { handleSwaggerProjectFromServer } from './helpers/handle-swagger-project-from-server';
import { handleSwaggerProjectsFromServer } from './helpers/handle-swagger-projects-from-server';
import { handleSwaggerFileChangesForSwaggerProjectLoaded } from './helpers/handle-swagger-file-changes-for-swagger-project-loaded';


export const swaggerProjectsPageChanged = createAction(
  '[Swagger Projects List Component] Swagger Projects Page Changed',
  props<{ pageNumber: number }>()
);

export const swaggerProjectsPageSizeChanged = createAction(
  '[Swagger Projects List Component] Swagger Projects Page Size Changed',
  props<{ pageSize: number }>()
);

export const swaggerProjectsStartedLoading = createAction(
  '[Swagger Projects Resolver] Swagger Projects Started Loading'
);

export const swaggerProjectsFinishedLoading = createAction(
  '[Load Swagger Projects Effect] Swagger Projects Finished Loading'
);

export const loadSwaggerProjects = createAction(
  '[Swagger Projects Resolver] Load Swagger Projects',
  props<{ pageNumber: number, pageSize: number, allIdsListRepr: number[] }>()
);

export const swaggerProjectsLoaded = createAction(
  '[Load Swagger Projects Effect] Swagger Projects Loaded',
  (
    response: SwaggerProjectsResponse,
    pageNumber: number,
    pageSize: number,
    allIdsListRepr: number[]
  ) => handleSwaggerProjectsFromServer(response, pageNumber, pageSize, allIdsListRepr)
);

export const errorLoadingSwaggerProjects = createAction(
  '[Load Swagger Projects Effect] Error Loading Swagger Projects'
);

export const swaggerProjectStartedLoading = createAction(
  '[Swagger Project Resolver] Swagger Project Started Loading'
);

export const swaggerProjectFinishedLoading = createAction(
  '[Load Swagger Project Effect] Swagger Project Finished Loading'
);

export const loadSwaggerProject = createAction(
  '[Swagger Project Resolver] Load Swagger Project',
  props<{ swaggerProjectId: number }>()
);

export const swaggerProjectLoaded = createAction(
  '[Load Swagger Project Effect] Swagger Project Loaded',
  (
    response: SwaggerProjectFromServer
  ): { swaggerProject: SwaggerProject } => handleSwaggerProjectFromServer(response)
);

export const errorLoadingSwaggerProject = createAction(
  '[Load Swagger Project Effect] Error Loading Swagger Project',
);

export const createSwaggerProject = createAction(
  '[Create Swagger Project Component] Create Swagger Project',
  props<{ swaggerProject: SwaggerProject }>()
);

export const swaggerProjectCreated = createAction(
  '[Create Swagger Project Effect] Swagger Project Created',
  (
    response: SwaggerProjectFromServer
  ): { swaggerProject: SwaggerProject } => handleSwaggerProjectFromServer(response)
);

export const errorCreatingSwaggerProject = createAction(
  '[Create Swagger Project Effect] Error Creating Swagger Project'
);

export const deleteSwaggerProject = createAction(
  '[Swagger Project Details Component Popup] Delete Swagger Project',
  props<{ swaggerProjectId: number }>()
);

export const swaggerFileChangesForSwaggerProjectLoaded = createAction(
  '[Load Swagger File Changes For Project Effect] Swagger File Changes For Project Loaded',
  (
    response: {
      swaggerProject: SwaggerProject
      swaggerFileChanges: SwaggerFileChangeFromServer[]
    }
  ): { updatedSwaggerProject: Update<SwaggerProject> } =>
    handleSwaggerFileChangesForSwaggerProjectLoaded(response)
);
