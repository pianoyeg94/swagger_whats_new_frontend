import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-check-box-radio-button-group',
  templateUrl: './check-box-radio-button-group.component.html',
  styleUrls: ['./check-box-radio-button-group.component.scss']
})
export class CheckBoxRadioButtonGroupComponent {
  @Input() control: FormControl;
  @Input() inputId: string;
  @Input() inputName: string;
  @Input() inputType: string;
  @Input() withFormControl: boolean;
  @Input() checkedByDefault: boolean;
  @Output() checkedEvent = new EventEmitter<string>();

  onChange() {
    this.checkedEvent.emit(this.inputId);
  }
}
