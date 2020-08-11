import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../store/app.reducer';
import { SwaggerFileChangesActions } from '../../../store/swagger-file-changes/action-types';
import { SwaggerFileChange } from '../../../models/swagger-file-change.model';


@Component({
  selector: 'app-swagger-file-change-comment-create-form',
  templateUrl: './swagger-file-change-comment-create-form.component.html',
  styleUrls: ['./swagger-file-change-comment-create-form.component.scss']
})
export class SwaggerFileChangeCommentCreateFormComponent implements OnInit, OnDestroy {
  @Input() swaggerFileChange$: Observable<SwaggerFileChange>;

  commentCreateForm = new FormGroup({
    commentText: new FormControl('', [Validators.required])
  });

  textAreaFocused = false;
  swaggerFileChange: SwaggerFileChange;
  swaggerFileChangeSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.swaggerFileChangeSubscription = this.swaggerFileChange$
      .subscribe(change => this.swaggerFileChange = change);
  }

  onTextAreaFocused() {
    this.textAreaFocused = true;
  }

  onTextAreaClear() {
    this.commentCreateForm.reset();
  }

  onSubmit() {
    if (!this.commentCreateForm.valid) { return; }

    const { commentText } = this.commentCreateForm.value;
    this.store.dispatch(SwaggerFileChangesActions.createSwaggerFileChangeComment({
      commentText,
      swaggerFileChange: this.swaggerFileChange
    }));

    this.commentCreateForm.reset();
  }

  ngOnDestroy() {
    this.swaggerFileChangeSubscription.unsubscribe();
  }
}
