import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { from, of } from 'rxjs';
import { catchError, concatMap, map, switchMap, tap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { nonObservableResponseErrorWrapper, observableResponseErrorWrapper } from '../../../utils/response-error-wrapper';
import { CompanyMembersHttpService } from '../../services/company-members-http.service';
import { CompanyMembersActions } from './action-types';
import { AppActions } from '../../../store/action-types';


@Injectable()
export class CompanyMembersEffects {

  loadCompanyMembers$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyMembersActions.loadCompanyMembers),
    concatMap(action => this.companyMembersHttpService.loadCompanyMembers(
      action.pageNumber,
      action.pageSize,
      action.allIdsListRepr
    ).pipe(
      switchMap(response => [
        CompanyMembersActions.companyMembersLoaded(
          response.response,
          response.pageNumber,
          response.pageSize,
          response.allIdsListRepr
        ),
        CompanyMembersActions.companyMembersFinishedLoading()
      ]),
      catchError(error => from([
          nonObservableResponseErrorWrapper(
            AppActions.toastErrorTopRight,
            error,
            ['error', 'message', 'detail'],
            'Invalid page number'
          ),
          CompanyMembersActions.companyMembersFinishedLoading(),
          CompanyMembersActions.errorLoadingCompanyMembers()
        ])
      )
    ))
  ));

  loadCompanyMember$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyMembersActions.loadCompanyMember),
    concatMap(action => this.companyMembersHttpService.loadCompanyMember(
      action.companyMemberId
    ).pipe(
      switchMap(response => [
        CompanyMembersActions.companyMemberLoaded(response),
        CompanyMembersActions.companyMemberFinishedLoading()
      ]),
      catchError(error => error.status === 404
        ? of(CompanyMembersActions.errorLoadingCompanyMember())
        : from([
          CompanyMembersActions.errorLoadingCompanyMember(),
          CompanyMembersActions.companyMemberFinishedLoading(),
          AppActions.toastErrorTopRight('An unknown error occurred')
        ])
      )
    ))
  ));

  inviteCompanyMember$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyMembersActions.inviteCompanyMember),
    tap(() => this.router.navigateByUrl('company')),
    concatMap(action => this.companyMembersHttpService.inviteCompanyMember(
      action.email,
      action.companyMembershipPermissions
    ).pipe(
      map(() => AppActions.toastSuccessTopRight('User invited successfully')),
      catchError(error => observableResponseErrorWrapper(
        AppActions.toastErrorTopRight,
        error,
        ['error', 'message', 'non_field_errors', 0],
        'User already invited'
      ))
    ))
  ));

  updateCompanyMember$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyMembersActions.updateCompanyMember),
    concatMap(action => this.companyMembersHttpService.updateCompanyMember(
      action.companyMemberId,
      action.companyMembershipPermissions
    ).pipe(
      switchMap(response => [
        CompanyMembersActions.companyMemberUpdated(response),
        AppActions.toastSuccessTopRight('Company member successfully updated')
      ]),
      catchError(() => of(AppActions.toastErrorTopRight('An unknown error occurred')))
    ))
  ));

  deleteCompanyMember$ = createEffect(() => this.actions$.pipe(
    ofType(CompanyMembersActions.deleteCompanyMember),
    tap(() => this.router.navigateByUrl('company')),
    concatMap(action => this.companyMembersHttpService.deleteCompanyMember(
      action.companyMemberId
    ).pipe(
      map(() => AppActions.toastSuccessTopRight('Company member successfully deleted')),
      catchError(() => of(AppActions.toastErrorTopRight('An unknown error occurred')))
    ))
  ));

  redirectToMainCompanyPage$ = createEffect(() => this.actions$.pipe(
    ofType(
      CompanyMembersActions.errorLoadingCompanyMembers,
      CompanyMembersActions.errorLoadingCompanyMember
    ),
    tap(() => this.router.navigateByUrl('/company'))
  ), { dispatch: false });

  constructor(
    private actions$: Actions,
    private router: Router,
    private companyMembersHttpService: CompanyMembersHttpService,
  ) {}
}
