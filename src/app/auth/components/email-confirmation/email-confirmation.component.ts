import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { catchError, first, map, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../store/app.reducer';
import { AppActions } from '../../../store/action-types';
import { AuthActions } from '../../store/action-types';
import { selectUser } from '../../store/auth.selectors';


@Component({
  selector: 'app-email-confirmation',
  templateUrl: './email-confirmation.component.html',
  styleUrls: ['./email-confirmation.component.scss']
})
export class EmailConfirmationComponent implements OnInit, OnDestroy {
  userSubscription: Subscription;

  constructor(
    private store: Store<fromApp.AppState>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.userSubscription = this.store.select(selectUser).pipe(
      first(),
      // If the user is not logged in, temporarily store the email confirmation token inside local storage.
      // The stored token will expire in 10 minutes (only within local storage).
      // We will use this token when the user logs in.
      // To cancel the observable pipe we navigate away.
      tap(user => {
        if (!user) {
          const message = 'Please login to confirm  your email address';
          this.storeEmailConfirmationTokenInLocalStorage();
          this.launchToastAndNavigateAway(message, '');
        }
      }),
      // If the user has already confirmed his email throw an error to cancel the observable pipe
      map(user => {
        if (user.emailConfirmed) {
          this.launchToastAndNavigateAway('Email already confirmed', '');
          throw new Error();
        }
        return user;
      }),
      catchError(() => null),
      // If everything goes well we dispatch the confirmUserEmail action
      switchMap(() => this.route.params),
      tap(params => this.store.dispatch(AuthActions.confirmUserEmail({
        emailConfirmationToken: params['confirmationToken']
      }))),
      tap(() => this.router.navigateByUrl('/swagger-projects'))
    ).subscribe();
  }

  storeEmailConfirmationTokenInLocalStorage() {
    const emailConfirmationToken = this.route.snapshot.params['confirmationToken'];
    const timeInTenMinutes = new Date(new Date().getTime() + 600000);
    localStorage.setItem(
      'emailConfirmationToken',
      JSON.stringify({ timestamp: timeInTenMinutes, token: emailConfirmationToken })
    );
  }

  launchToastAndNavigateAway(message: string, destination: string) {
    this.store.dispatch(AppActions.toastErrorTopCenter(message));
    this.router.navigateByUrl(destination);
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
}
