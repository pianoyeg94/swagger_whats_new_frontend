import { AsyncValidator, FormGroup, ValidationErrors } from '@angular/forms';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, map, switchMap } from 'rxjs/operators';

import { VCSAccountsHttpService } from '../../services/vcs-accounts-http.service';


@Injectable({ providedIn: 'root' })
export class UniqueVCSAccountValidator implements AsyncValidator {

  constructor(private vcsAccountHttpService: VCSAccountsHttpService) {}

  validate = (formGroup: FormGroup): Observable<ValidationErrors | null> => {
    return formGroup.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      first(),
      switchMap(value => this.vcsAccountHttpService.checkVCSAccountIsNotTaken(
        value.vcsService,
        value.accountType,
        value.accountName
      )),
      map(res => res.vcs_account_exists ? { nonUniqueVCSAccount: true } : null)
    );
  }
}
