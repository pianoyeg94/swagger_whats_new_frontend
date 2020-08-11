import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Update } from '@ngrx/entity';

import * as fromApp from '../../../../store/app.reducer';
import { SwaggerFileChangesActions } from '../../../store/swagger-file-changes/action-types';
import { SwaggerFileChange } from '../../../models/swagger-file-change.model';
import { User } from '../../../../auth/models/user.model';


@Component({
  selector: 'app-swagger-file-change-comments-list',
  templateUrl: './swagger-file-change-comments-list.component.html',
  styleUrls: ['./swagger-file-change-comments-list.component.scss']
})
export class SwaggerFileChangeCommentsListComponent implements OnInit, OnDestroy {
  @Input() swaggerFileChange$: Observable<SwaggerFileChange>;
  @Input() user$: Observable<User>;

  commentEditFormsMapping: { [key: number]: FormGroup } = {};
  commentsInEditModeMapping: { [key: number]: boolean } = {};

  swaggerFileChange: SwaggerFileChange;
  swaggerFileChangeSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.swaggerFileChangeSubscription = this.swaggerFileChange$.pipe(
      tap(change => change.comments
        .map(comment => [comment.id, false])
        .forEach((val: [number, boolean]) => this.commentsInEditModeMapping[val[0]] = val[1])
      )
    ).subscribe(change => this.swaggerFileChange = change);
  }

  onCommentEditStart(commentId: number, commentText: string) {
    this.commentsInEditModeMapping[commentId] = true;
    this.commentEditFormsMapping[commentId] = new FormGroup({
      commentText: new FormControl(commentText, [Validators.required])
    });
  }

  onCommentEditCancel(commentId: number) {
    this.commentsInEditModeMapping[commentId] = false;
    delete this.commentEditFormsMapping[commentId];
  }

  onCommentEditComplete(commentId: number) {
    if (!this.commentEditFormsMapping[commentId].valid) { return; }

    const { commentText } = this.commentEditFormsMapping[commentId].value;
    const swaggerFileChangeToBeUpdated = { ...this.swaggerFileChange };
    const commentsToBeUpdated = [...swaggerFileChangeToBeUpdated.comments];

    const updatedComments = commentsToBeUpdated.map(comment => {
      const updatedComment = { ...comment };
      if (comment.id === commentId) { updatedComment.commentText = commentText; }
      return updatedComment;
    });

    const updatedSwaggerFileChange: Update<SwaggerFileChange> = {
      id: swaggerFileChangeToBeUpdated.id,
      changes: {
        comments: updatedComments
      }
    };

    this.store.dispatch(SwaggerFileChangesActions.updateSwaggerFileChangeComment({
      commentText,
      commentId,
      swaggerFileChangeId: this.swaggerFileChange.id
    }));
    this.store.dispatch(SwaggerFileChangesActions.updateSwaggerFileChangeCommentInStore({
      updatedSwaggerFileChange
    }));
  }

  onCommentDelete(commentId: number) {
    const swaggerFileChangeToBeUpdated = { ...this.swaggerFileChange };
    const commentsToBeUpdated = [...swaggerFileChangeToBeUpdated.comments];
    const updatedComments = commentsToBeUpdated.filter(comment => comment.id !== commentId);

    const updatedSwaggerFileChange: Update<SwaggerFileChange> = {
      id: swaggerFileChangeToBeUpdated.id,
      changes: {
        comments: updatedComments
      }
    };

    this.store.dispatch(SwaggerFileChangesActions.deleteSwaggerFileChangeComment({
      commentId,
      swaggerFileChangeId: this.swaggerFileChange.id
    }));
    this.store.dispatch(SwaggerFileChangesActions.deleteSwaggerFileChangeCommentFromStore({
      updatedSwaggerFileChange
    }));
  }

  ngOnDestroy() {
    this.swaggerFileChangeSubscription.unsubscribe();
  }
}
