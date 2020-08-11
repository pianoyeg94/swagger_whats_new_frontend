import { Injectable } from '@angular/core';
import { AsyncValidator, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  first,
  map,
  switchMap
} from 'rxjs/operators';

import { VCSAccountsHttpService } from '../../services/vcs-accounts-http.service';


@Injectable({ providedIn: 'root' })
export class VCSAccountExistsValidator implements AsyncValidator {

  constructor(private vcsAccountsHttpService: VCSAccountsHttpService) {}

  validate = (formGroup: FormGroup): Observable<ValidationErrors | null> => {
    return formGroup.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      first(),
      switchMap(value => this.vcsAccountsHttpService.checkVCSAccountExists(
        value.vcsService,
        value.accountName
      )),
      map(res => res.status !== 200 ? { nonExistentVcsAccount: true } : null),
      catchError(error => error.status === 404 ? of({ nonExistentVcsAccount: true }) : null)
    );
  }
}
