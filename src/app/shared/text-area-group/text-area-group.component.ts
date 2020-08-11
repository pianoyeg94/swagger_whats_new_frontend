import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-text-area-group',
  templateUrl: './text-area-group.component.html',
  styleUrls: ['./text-area-group.component.scss']
})
export class TextAreaGroupComponent {
  @Input() control: FormControl;
  @Input() withFormControl = true;
  @Input() labelForId: string;
  @Input() minHeightTextarea: string;
  @Input() borderRadiusTextarea = '2px';
  @Input() fontSizeTextarea: string;
  @Input() marginBottomLabel = '0px';
  @Input() marginTopLabel = '0px';
  @Input() colorLabel: string;
  @Input() fontSizeLabel: string;
  @Input() fontWeightLabel: string;
  @Input() labelUpper = false;

  @Output() onAreaFocused = new EventEmitter();
  @Output() onAreaFocusedOut = new EventEmitter();

  getLabelUpper() {
    return this.labelUpper ? 'uppercase' : '';
  }

  onFocus() {
    this.onAreaFocused.emit();
  }

  onFocusOut() {
    this.onAreaFocusedOut.emit();
  }
}
