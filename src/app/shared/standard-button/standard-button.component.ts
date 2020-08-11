import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-standard-button',
  templateUrl: './standard-button.component.html',
  styleUrls: ['./standard-button.component.scss']
})
export class StandardButtonComponent {
  @Input() buttonClass = 'primary';
  @Input() disabledIf = false;
  @Input() btnType: string;
  @Output() onClick = new EventEmitter();

  onClicked() {
    this.onClick.emit();
  }
}
