import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, map, switchMap } from 'rxjs/operators';

import { SharedHttpService } from '../services/shared-http.service';


@Injectable({ providedIn: 'root' })
export class UniqueEmailValidator implements AsyncValidator {

  constructor(private sharedHttpService: SharedHttpService) {
  }

  validate = (control: FormControl): Observable<ValidationErrors | null> => {
    return control.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      first(),
      switchMap(value => this.sharedHttpService.validateUserEmailIsUnique(value)),
      map(res => res.email_taken ? { nonUniqueEmail: true } : null)
    );
  };
}
