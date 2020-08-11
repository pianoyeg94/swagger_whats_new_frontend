import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-input-field-group',
  templateUrl: './input-field-group.component.html',
  styleUrls: ['./input-field-group.component.scss']
})
export class InputFieldGroupComponent {
  showFocusBorder = false;

  @Input() group: FormGroup;
  @Input() control: FormControl;
  @Input() showValidationErrors = true;
  @Input() inputId: string;
  @Input() inputPlaceholder = '';
  @Input() inputType = 'text';
  @Input() labelSize = 'normal';
  @Input() withLabel = true;

  showFormControlErrors() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }

  showFormGroupErrors() {
    if (!this.group) {
      return false;
    }
    const { errors } = this.group;
    const { dirty, touched } = this.control;
    return dirty && touched && errors;
  }

}
