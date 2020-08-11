import { FormGroup, ValidationErrors, Validator } from '@angular/forms';
import { Injectable } from '@angular/core';


@Injectable({ providedIn: 'root' })
export class PasswordConfirmationValidator implements Validator {

  validate(formGroup: FormGroup): ValidationErrors | null {
    const { password, passwordConfirmation } = formGroup.value;
    return password === passwordConfirmation ? null : { passwordsDontMatch: true };
  }
}
