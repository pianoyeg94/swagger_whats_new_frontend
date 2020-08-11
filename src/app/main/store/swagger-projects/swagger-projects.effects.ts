import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, of } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { nonObservableResponseErrorWrapper } from '../../../utils/response-error-wrapper';
import { SwaggerProjectsHttpService } from '../../services/swagger-projects-http.service';
import { SwaggerProjectsActions } from './action-types';
import { AppActions } from '../../../store/action-types';


@Injectable()
export class SwaggerProjectsEffects {

  loadSwaggerProjects$ = createEffect(() => this.actions$.pipe(
    ofType(SwaggerProjectsActions.loadSwaggerProjects),
    concatMap(action => this.swaggerProjectsHttpService.loadSwaggerProjects(
      action.pageNumber,
      action.pageSize,
      action.allIdsListRepr
    ).pipe(
      switchMap(response => [
        SwaggerProjectsActions.swaggerProjectsLoaded(
          response.response,
          response.pageNumber,
          response.pageSize,
          response.allIdsListRepr
        ),
        SwaggerProjectsActions.swaggerProjectsFinishedLoading()
      ]),
      catchError(error => from([
          nonObservableResponseErrorWrapper(
            AppActions.toastErrorTopRight,
            error,
            ['error', 'message', 'detail'],
            'Invalid page number'
          ),
          SwaggerProjectsActions.swaggerProjectsFinishedLoading(),
          SwaggerProjectsActions.errorLoadingSwaggerProjects()
        ])
      )
    ))
  ));

  loadSwaggerProject$ = createEffect(() => this.actions$.pipe(
    ofType(SwaggerProjectsActions.loadSwaggerProject),
    concatMap(action => this.swaggerProjectsHttpService.loadSwaggerProject(
      action.swaggerProjectId
    ).pipe(
      switchMap(response => [
        SwaggerProjectsActions.swaggerProjectLoaded(response),
        SwaggerProjectsActions.swaggerProjectFinishedLoading()
      ]),
      catchError(error => error.status === 404
        ? from([
          SwaggerProjectsActions.errorLoadingSwaggerProject(),
          SwaggerProjectsActions.swaggerProjectFinishedLoading()
        ])
        : from([
          SwaggerProjectsActions.errorLoadingSwaggerProject(),
          SwaggerProjectsActions.swaggerProjectFinishedLoading(),
          AppActions.toastErrorTopRight('An unknown error occurred')
        ])
      )
    ))
  ));

  createSwaggerProject$ = createEffect(() => this.actions$.pipe(
    ofType(SwaggerProjectsActions.createSwaggerProject),
    concatMap(action => this.swaggerProjectsHttpService.createSwaggerProject(
      action.swaggerProject
    ).pipe(
      switchMap(response => [
        SwaggerProjectsActions.swaggerProjectCreated(response),
        AppActions.toastSuccessTopRight('Project created successfully'),
        AppActions.appNavigationEnd()
      ]),
      catchError(error => from([
        nonObservableResponseErrorWrapper(
          AppActions.toastErrorTopRight,
          error,
          ['error', 'message', 0],
          'Provided repository does not exist'
        ),
        SwaggerProjectsActions.errorCreatingSwaggerProject()
      ]))
    ))
  ));

  deleteSwaggerProject$ = createEffect(() => this.actions$.pipe(
    ofType(SwaggerProjectsActions.deleteSwaggerProject),
    concatMap(action => this.swaggerProjectsHttpService.deleteSwaggerProject(
      action.swaggerProjectId
    ).pipe(
      map(() => AppActions.toastSuccessTopRight('Project deleted successfully')),
      catchError(() => of(AppActions.toastErrorTopRight('An unknown error occurred')))
    ))
  ));

  redirectToMainSwaggerProjectsPage$ = createEffect(() => this.actions$.pipe(
    ofType(
      SwaggerProjectsActions.swaggerProjectCreated,
      SwaggerProjectsActions.errorLoadingSwaggerProject,
      SwaggerProjectsActions.errorLoadingSwaggerProjects,
      SwaggerProjectsActions.errorCreatingSwaggerProject
    ),
    tap(() => this.router.navigateByUrl('/swagger-projects'))
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private swaggerProjectsHttpService: SwaggerProjectsHttpService,
    private router: Router
  ) {}
}
