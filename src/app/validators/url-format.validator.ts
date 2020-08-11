import { Injectable } from '@angular/core';
import { FormControl, ValidationErrors, Validator } from '@angular/forms';


@Injectable({ providedIn: 'root' })
export class UrlFormatValidator implements Validator {

  validate(control: FormControl): ValidationErrors | null {
    const urlPattern = new RegExp('^(?:http(s)?:\\/\\/)?[\\w.-]+(?:\\.[\\w\\.-]+)+[\\w\\-\\._~:/?#[\\]@!\\$&\'\\(\\)\\*\\+,;=.]+$');
    const url = control.value;
    return !urlPattern.test(url) ? { notAUrl: true } : null;
  }
}
