import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import { AuthActions } from '../../../auth/store/action-types';
import { selectUser } from '../../../auth/store/auth.selectors';
import { selectUserProfile } from '../../store/user-profile/user-profile.selectors';
import { selectPageTitle } from '../../store/main/main.selectors';


@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  userName$: Observable<string>;
  userProfilePhotoUrl$: Observable<string>;
  pageTitle$: Observable<string>;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.userName$ = this.store.select(selectUser).pipe(
      map(user => user ? user.firstName : null)
    );

    this.userProfilePhotoUrl$ = this.store.select(selectUserProfile).pipe(
      map(userProfile => userProfile.profilePhotoUrl
        ? userProfile.profilePhotoUrl
        : 'assets/img/no-user-photo.jpg'
      )
    );

    this.pageTitle$ = this.store.select(selectPageTitle);
  }

  onLogout() {
    this.store.dispatch(AuthActions.logUserOut());
  }
}
