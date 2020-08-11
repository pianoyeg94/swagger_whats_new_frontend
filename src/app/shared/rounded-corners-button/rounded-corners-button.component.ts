import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-rounded-corners-button',
  templateUrl: './rounded-corners-button.component.html',
  styleUrls: ['./rounded-corners-button.component.scss']
})
export class RoundedCornersButtonComponent {
  @Input() disabledIf = false;
  @Input() btnType: string;
  @Input() btnClass = 'primary';
}
