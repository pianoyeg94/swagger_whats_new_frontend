import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../../store/app.reducer';
import { CompanyActions } from '../../../../store/company/action-types';
import { AuthActions } from '../../../../../auth/store/action-types';
import { MainActions } from '../../../../store/main/action-types';
import { selectUser } from '../../../../../auth/store/auth.selectors';


@Component({
  selector: 'app-user-profile-main',
  templateUrl: './user-profile-main.component.html',
  styleUrls: ['./user-profile-main.component.scss']
})
export class UserProfileMainComponent implements OnInit {
  isCompanyOwner$: Observable<boolean>;
  popupVisible = false;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.store.dispatch(MainActions.ContentChange({ pageTitle: 'My Profile' }));

    this.isCompanyOwner$ = this.store.select(selectUser).pipe(
      map(user => user.isCompanyOwner),
      shareReplay()
    );
  }

  onPopupOpen() {
    this.popupVisible = true;
  }

  onPopupClose() {
    this.popupVisible = false;
  }

  onCompanyDelete() {
    this.store.dispatch(CompanyActions.deleteCompany());
  }

  onCompanyMembershipCancel() {
    this.store.dispatch(AuthActions.cancelUsersCompanyMembership());
  }
}
