import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../store/app.reducer';
import { selectUserProfile } from '../../../store/user-profile/user-profile.selectors';
import { UserProfileActions } from '../../../store/user-profile/action-types';


@Component({
  selector: 'app-user-profile-form',
  templateUrl: './user-profile-form.component.html',
  styleUrls: ['./user-profile-form.component.scss']
})
export class UserProfileFormComponent implements OnInit, OnDestroy {
  userProfileSubscription: Subscription;

  userProfileForm = new FormGroup({
    phoneNumber: new FormControl('', [
      Validators.pattern('^[0-9]*$'),
      Validators.minLength(11),
      Validators.maxLength(15)
    ]),
    skype: new FormControl('', [Validators.maxLength(50)])
  });

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    this.userProfileSubscription = this.store.select(selectUserProfile)
      .subscribe(profile => {
        if (!profile) { return; }
        this.userProfileForm.get('phoneNumber').setValue(profile.phoneNumber);
        this.userProfileForm.get('skype').setValue(profile.skype);
      });
  }

  onSubmit() {
    if (!this.userProfileForm.valid) { return; }
    const { skype, phoneNumber } = this.userProfileForm.value;
    this.store.dispatch(UserProfileActions.updateUserProfile({ skype, phoneNumber }));
  }

  ngOnDestroy() {
    this.userProfileSubscription.unsubscribe();
  }
}
