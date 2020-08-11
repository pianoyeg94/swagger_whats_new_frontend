import { createAction, props } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import { SwaggerProject } from '../../models/swagger-project.model';
import { SwaggerFileChange } from '../../models/swagger-file-change.model';
import {
  SwaggerFileChangeCommentFromServer,
  SwaggerFileChangeFromServer
} from '../../services/response-models/swagger-file-changes-response';
import { handleSwaggerFileChangesFromServer } from './helpers/handle-swagger-file-changes-from-server';
import { handleCommentFromServer } from './helpers/handle-comment-from-server';


export const loadSwaggerFileChanges = createAction(
  '[Swagger File Changes Resolver] Load Swagger File Changes',
  props<{ swaggerProject: SwaggerProject }>()
);

export const swaggerFileChangesLoaded = createAction(
  '[Load Swagger File Changes] Swagger File Changes Loaded',
  (
    response: {
      swaggerProject: SwaggerProject
      swaggerFileChanges: SwaggerFileChangeFromServer[]
    }
  ): { swaggerFileChanges: SwaggerFileChange[] } => handleSwaggerFileChangesFromServer(response)
);

export const errorLoadingSwaggerFileChanges = createAction(
  '[Load Swagger File Changes] Error Loading Swagger File Changes',
);

export const createSwaggerFileChangeComment = createAction(
  '[Swagger File Change Details Component] Create Swagger File Change Comment',
  props<{ commentText: string, swaggerFileChange: SwaggerFileChange }>()
);

export const swaggerFileChangeCommentCreated = createAction(
  '[Create Swagger File Change Comment Effect] Swagger File Change Comment Created',
  (
    response: {
      newComment: SwaggerFileChangeCommentFromServer,
      swaggerFileChange: SwaggerFileChange
    }
  ): { updatedSwaggerFileChange: Update<SwaggerFileChange> } => handleCommentFromServer(response)
);

export const updateSwaggerFileChangeComment = createAction(
  '[Swagger File Change Details Component] Updated Swagger File Change Comment',
  props<{ commentText: string, commentId: number, swaggerFileChangeId: number }>()
);

export const updateSwaggerFileChangeCommentInStore = createAction(
  '[Swagger File Change Details Component] Updated Swagger File Change Comment In Store',
  props<{ updatedSwaggerFileChange: Update<SwaggerFileChange> }>()
);

export const deleteSwaggerFileChangeComment = createAction(
  '[Swagger File Change Details Component] Delete Swagger File Change Comment',
  props<{ commentId: number, swaggerFileChangeId: number }>()
);

export const deleteSwaggerFileChangeCommentFromStore = createAction(
  '[Swagger File Change Details Component] Delete Swagger File Change Comment From Store',
  props<{ updatedSwaggerFileChange: Update<SwaggerFileChange> }>()
);
