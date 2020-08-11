import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { SwaggerFileChange } from '../../models/swagger-file-change.model';
import { SwaggerFileChangesActions } from './action-types';
import { AuthActions } from '../../../auth/store/action-types';


export interface SwaggerFileChangesState extends EntityState<SwaggerFileChange> {
}

export const adapter = createEntityAdapter<SwaggerFileChange>();

export const initialSwaggerFileChangesState = adapter.getInitialState({});

export const { selectEntities } = adapter.getSelectors();

export const swaggerFileChangesReducer = createReducer(
  initialSwaggerFileChangesState,
  on(SwaggerFileChangesActions.swaggerFileChangesLoaded, (state, { swaggerFileChanges }) =>
    adapter.addMany(swaggerFileChanges, state)
  ),
  on(
    SwaggerFileChangesActions.swaggerFileChangeCommentCreated,
    SwaggerFileChangesActions.deleteSwaggerFileChangeCommentFromStore,
    SwaggerFileChangesActions.updateSwaggerFileChangeCommentInStore,
    (state, { updatedSwaggerFileChange }) =>
      adapter.updateOne(updatedSwaggerFileChange, state)
  ),
  on(AuthActions.cleanUpAfterLogout, state => adapter.removeAll(state))
);

