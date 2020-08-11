import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  NavigationCancel,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router
} from '@angular/router';
import { Observable, Subscription, zip } from 'rxjs';
import { delay, filter, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';

import * as fromApp from './store/app.reducer';
import { AppActions } from './store/action-types';
import {
  selectAppNavigationInProgress,
  selectLaunchToast,
  selectToast
} from './store/app.selectors';
import { selectUser } from './auth/store/auth.selectors';
import { Toast } from './store/app.reducer';
import { AuthActions } from './auth/store/action-types';
import { localStorageGetDecryptedObject } from './utils/local-storage-encryption';
import { User } from './auth/models/user.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  appNavigationInProgress$: Observable<boolean>;
  containerClass$: Observable<string>;

  routerSubscription: Subscription;
  toastStateSubscription: Subscription;

  constructor(
    private router: Router,
    private store: Store<fromApp.AppState>,
    private toast: ToastrService
  ) {
  }

  ngOnInit() {

    // Decide what css container class to use depending on the user's logged in / logged out state
    this.containerClass$ = this.store.select(selectUser).pipe(
      map(u => u ? 'container__main' : 'container__auth')
    );

    // If userData is stored in local storage and wasn't tampered with log the user in
    const user = localStorageGetDecryptedObject<User>('userData');
    if (user) {
      this.store.dispatch(AuthActions.automaticallyLogUserIn({ user }));
    }

    // Show a loader component while navigation is in progress
    this.appNavigationInProgress$ = this.store.select(selectAppNavigationInProgress);
    this.routerSubscription = this.router.events.pipe(delay(0)).subscribe(event => {
      switch (true) {
        case event instanceof NavigationStart: {
          this.store.dispatch(AppActions.appNavigationStart());
          break;
        }
        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.store.dispatch(AppActions.appNavigationEnd());
          break;
        }
        default: {
          break;
        }
      }
    });

    // Launch a toast depending on the app state modified by some action
    this.toastStateSubscription = zip(
      this.store.select(selectLaunchToast),
      this.store.select(selectToast)
    ).pipe(
      filter(([launchToast, toast]) => launchToast === true),
      map(([launchToast, toast]) => toast)
    ).subscribe((toast: Toast) => {
      switch (`${toast.messageType} ${toast.position}`) {
        case `${AppActions.toastTypeSuccess} ${AppActions.toastPositionTopCenter}`:
          this.toast.success(toast.message, toast.message, { positionClass: 'toast-top-center' });
          break;
        case `${AppActions.toastTypeSuccess} ${AppActions.toastPositionTopRight}`:
          this.toast.success(toast.message, toast.message, { positionClass: 'toast-top-right' });
          break;
        case `${AppActions.toastTypeError} ${AppActions.toastPositionTopCenter}`:
          this.toast.error(toast.message, toast.message, { positionClass: 'toast-top-center' });
          break;
        case `${AppActions.toastTypeError} ${AppActions.toastPositionTopRight}`:
          this.toast.error(toast.message, toast.message, { positionClass: 'toast-top-right' });
          break;
      }
      this.store.dispatch(AppActions.silenceToast());
    });
  }

  ngOnDestroy() {
    this.routerSubscription.unsubscribe();
    this.toastStateSubscription.unsubscribe();
  }
}
