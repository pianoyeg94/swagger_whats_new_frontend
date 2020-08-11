import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../store/app.reducer';
import { AuthActions } from '../../../../auth/store/action-types';
import { UserProfileActions } from '../../../store/user-profile/action-types';
import { selectUser } from '../../../../auth/store/auth.selectors';
import { selectUserProfile } from '../../../store/user-profile/user-profile.selectors';
import { UniqueEmailValidator } from '../../../../validators/unique-email.validator';


@Component({
  selector: 'app-user-update-form',
  templateUrl: './user-update-form.component.html',
  styleUrls: ['./user-update-form.component.scss']
})
export class UserUpdateFormComponent implements OnInit, AfterViewInit, OnDestroy {
  allowedMimeTypes = ['image/bmp', 'image/jpeg', 'image/png'];

  userProfilePhotoUrl$: Observable<string>;
  userSubscription: Subscription;
  selectedImageFile: File;

  userUpdateForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email,
      Validators.maxLength(50)
    ], [this.uniqueEmailValidator.validate]),
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    jobTitle: new FormControl('', [Validators.required])
  });

  constructor(
    private store: Store<fromApp.AppState>,
    private uniqueEmailValidator: UniqueEmailValidator,
  ) {}

  ngOnInit() {
    this.userProfilePhotoUrl$ = this.store.select(selectUserProfile).pipe(
      map(profile => profile.profilePhotoUrl
        ? profile.profilePhotoUrl
        : 'assets/img/no-user-photo.jpg'
      )
    );
  }

  ngAfterViewInit() {
    this.userSubscription = this.store.select(selectUser).pipe(delay(0))
      .subscribe(user => {
        this.userUpdateForm.get('email').setValue(user.email);
        this.userUpdateForm.get('firstName').setValue(user.firstName);
        this.userUpdateForm.get('lastName').setValue(user.lastName);
        this.userUpdateForm.get('jobTitle').setValue(user.jobTitle);
      });
  }

  onSubmit() {
    if (!this.userUpdateForm.valid) { return; }

    const { email, firstName, lastName, jobTitle } = this.userUpdateForm.value;
    this.store.dispatch(AuthActions.updateUser({
      email,
      lastName,
      firstName,
      jobTitle
    }));
  }

  onPhotoUpload(event) {
    this.selectedImageFile = event.target.files[0];

    if (!this.allowedMimeTypes.includes(this.selectedImageFile.type)) {
      return;
    }

    this.store.dispatch(UserProfileActions.uploadUserProfilePhoto({
      selectedFile: this.selectedImageFile,
      selectedFileName: this.selectedImageFile.name
    }));
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
