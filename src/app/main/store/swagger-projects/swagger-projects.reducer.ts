import { createReducer, on } from '@ngrx/store';
import { createEntityAdapter, EntityState } from '@ngrx/entity';

import { SwaggerProject } from '../../models/swagger-project.model';
import { SwaggerProjectsActions } from './action-types';
import { AuthActions } from '../../../auth/store/action-types';


export interface SwaggerProjectState extends EntityState<SwaggerProject> {
  overallEntitiesCount: number;
  currentPageSize: number;
  currentPageNumber: number;
  numberOfEntitiesLoaded: number;
  allIdsListRepr: number[];
  entitiesLoading: boolean;
  singleEntityLoading: boolean;
}

export const adapter = createEntityAdapter<SwaggerProject>();

export const initialSwaggerProjectsState = adapter.getInitialState({
  overallEntitiesCount: 0,
  currentPageSize: 5,
  currentPageNumber: 1,
  numberOfEntitiesLoaded: 0,
  allIdsListRepr: null,
  entitiesLoading: false,
  singleEntityLoading: false
});

export const swaggerProjectsReducer = createReducer(
  initialSwaggerProjectsState,
  on(SwaggerProjectsActions.swaggerProjectsPageChanged, (state, { pageNumber }) => ({
    ...state,
    currentPageNumber: pageNumber
  })),
  on(SwaggerProjectsActions.swaggerProjectsPageSizeChanged, (state, { pageSize }) => ({
    ...state,
    currentPageSize: pageSize
  })),
  on(SwaggerProjectsActions.swaggerProjectsStartedLoading, state => ({
    ...state,
    entitiesLoading: true
  })),
  on(SwaggerProjectsActions.swaggerProjectsFinishedLoading, state => ({
    ...state,
    entitiesLoading: false,
  })),
  on(SwaggerProjectsActions.swaggerProjectStartedLoading, state => ({
    ...state,
    singleEntityLoading: true
  })),
  on(SwaggerProjectsActions.swaggerProjectFinishedLoading, state => ({
    ...state,
    singleEntityLoading: false,
  })),
  on(SwaggerProjectsActions.swaggerProjectsLoaded, (state, action) =>
    adapter.addMany(action.swaggerProjects, {
      ...state,
      overallEntitiesCount: action.overallEntitiesCount,
      numberOfEntitiesLoaded: state.numberOfEntitiesLoaded + action.numberOfEntitiesLoaded,
      allIdsListRepr: action.allIdsListRepr,
      currentPageNumber: action.currentPageNumber,
      currentPageSize: action.currentPageSize
    })
  ),
  on(SwaggerProjectsActions.swaggerProjectLoaded, (state, { swaggerProject }) =>
    adapter.addOne(swaggerProject, state)
  ),
  on(SwaggerProjectsActions.swaggerProjectCreated, (state, { swaggerProject }) =>
    adapter.addOne(swaggerProject, {
      ...state,
      overallEntitiesCount: state.overallEntitiesCount + 1,
      allIdsListRepr: [...state.allIdsListRepr, swaggerProject.id],
    })
  ),
  on(SwaggerProjectsActions.deleteSwaggerProject, (state, { swaggerProjectId }) =>
    adapter.removeOne(swaggerProjectId, {
      ...state,
      overallEntitiesCount: state.overallEntitiesCount - 1,
      allIdsListRepr: state.allIdsListRepr.filter(id => id !== swaggerProjectId)
    })
  ),
  on(SwaggerProjectsActions.swaggerFileChangesForSwaggerProjectLoaded, (state, { updatedSwaggerProject }) =>
    adapter.updateOne(updatedSwaggerProject, state)
  ),
  on(AuthActions.cleanUpAfterLogout, state =>
    adapter.removeAll({
      ...state,
      overallEntitiesCount: 0,
      currentPageSize: 5,
      currentPageNumber: 1,
      numberOfEntitiesLoaded: 0,
      allIdsListRepr: null,
      entitiesLoading: false,
      singleEntityLoading: false
    })
  )
);
