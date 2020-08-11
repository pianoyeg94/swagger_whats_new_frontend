import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import { MainActions } from '../../store/main/action-types';

@Component({
  selector: 'app-email-confirmation-hint',
  templateUrl: './email-confirmation-hint.component.html',
  styleUrls: ['./email-confirmation-hint.component.scss']
})
export class EmailConfirmationHintComponent implements OnInit, OnDestroy {

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.dispatch(MainActions.ContentChange({ pageTitle: '' }));
  }

  ngOnDestroy() {
    this.store.dispatch(MainActions.notifyUserLeftEmailConfirmationHintPage());
  }
}
