import { Injectable } from '@angular/core';
import { AsyncValidator, FormControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, first, map, switchMap } from 'rxjs/operators';

import { SwaggerProjectsHttpService } from '../../services/swagger-projects-http.service';


@Injectable({ providedIn: 'root' })
export class UniqueSwaggerProjectNameValidator implements AsyncValidator {

  constructor(private swaggerProjectsHttpService: SwaggerProjectsHttpService) {}

  validate = (control: FormControl): Observable<ValidationErrors | null> => {
    return control.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      first(),
      switchMap(value => this.swaggerProjectsHttpService.checkSwaggerProjectNameIsUnique(value)),
      map(res => res.swagger_project_name_taken ? { nonUniqueProjectName: true } : null)
    );
  };
}

