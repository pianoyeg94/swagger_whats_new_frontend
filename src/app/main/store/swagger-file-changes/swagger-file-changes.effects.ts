import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, of } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { SwaggerFileChangesHttpService } from '../../services/swagger-file-changes-http.service';
import { SwaggerFileChangesActions } from './action-types';
import { SwaggerProjectsActions } from '../swagger-projects/action-types';
import { AppActions } from '../../../store/action-types';


@Injectable()
export class SwaggerFileChangesEffects {

  loadSwaggerFileChanges$ = createEffect(() => this.actions$.pipe(
    ofType(SwaggerFileChangesActions.loadSwaggerFileChanges),
    concatMap(action => this.swaggerFileChangesHttpService.loadSwaggerFileChanges(
      action.swaggerProject
    ).pipe(
      switchMap(response => [
        SwaggerFileChangesActions.swaggerFileChangesLoaded(response),
        SwaggerProjectsActions.swaggerFileChangesForSwaggerProjectLoaded(response)
      ]),
      catchError(() => from([
        SwaggerFileChangesActions.errorLoadingSwaggerFileChanges(),
        AppActions.toastErrorTopRight('An unknown error occurred')
      ]))
    ))
  ));

  createSwaggerFileChangeComment$ = createEffect(() => this.actions$.pipe(
    ofType(SwaggerFileChangesActions.createSwaggerFileChangeComment),
    concatMap(action => this.swaggerFileChangesHttpService.createSwaggerFileChangeComment(
      action.commentText,
      action.swaggerFileChange
    ).pipe(
      map(response => SwaggerFileChangesActions.swaggerFileChangeCommentCreated(response)),
      catchError(() => of(AppActions.toastErrorTopRight('An unknown error occurred')))
    ))
  ));

  updateSwaggerFileChangeComment$ = createEffect(() => this.actions$.pipe(
    ofType(SwaggerFileChangesActions.updateSwaggerFileChangeComment),
    concatMap(action => this.swaggerFileChangesHttpService.updateSwaggerFileChangeComment(
      action.commentText,
      action.commentId,
      action.swaggerFileChangeId
    ).pipe(
      map(() => AppActions.dummyAction()),
      catchError(() => of(AppActions.toastErrorTopRight('An unknown error occurred')))
    ))
  ));

  deleteSwaggerFileChangeComment$ = createEffect(() => this.actions$.pipe(
    ofType(SwaggerFileChangesActions.deleteSwaggerFileChangeComment),
    concatMap(action => this.swaggerFileChangesHttpService.deleteSwaggerFileChangeComment(
      action.commentId,
      action.swaggerFileChangeId
    ).pipe(
      map(() => AppActions.dummyAction()),
      catchError(() => of(AppActions.toastErrorTopRight('An unknown error occurred')))
    ))
  ));

  redirectToMainSwaggerProjectsPage$ = createEffect(() => this.actions$.pipe(
    ofType(SwaggerFileChangesActions.errorLoadingSwaggerFileChanges),
    tap(() => this.router.navigateByUrl('/swagger-projects'))
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private swaggerFileChangesHttpService: SwaggerFileChangesHttpService,
    private router: Router
  ) {}
}

