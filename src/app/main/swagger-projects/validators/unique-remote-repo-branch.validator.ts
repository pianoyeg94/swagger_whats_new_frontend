import { Injectable } from '@angular/core';
import { AsyncValidator, FormGroup, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, map, switchMap } from 'rxjs/operators';

import { SwaggerProjectsHttpService } from '../../services/swagger-projects-http.service';


@Injectable({ providedIn: 'root' })
export class UniqueRemoteRepoBranchValidator implements AsyncValidator {

  constructor(private swaggerProjectsHttpService: SwaggerProjectsHttpService) {}

  validate = (formGroup: FormGroup): Observable<ValidationErrors | null> => {
    return formGroup.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      first(),
      switchMap(value => this.swaggerProjectsHttpService.checkRemoteRepoBranchIsUnique(
        value.remoteVcsAccount,
        value.remoteRepoName,
        value.remoteRepoBranch
      )),
      map(res => res.branch_already_registered ? { nonUniqueRepoBranch: true } : null)
    );
  }
}

