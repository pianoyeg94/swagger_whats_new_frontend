import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  @Input() userName$: Observable<string>;
  @Input() userProfilePhotoUrl$: Observable<string>;
  @Input() userProfilePageLink: string;
  @Output() logout = new EventEmitter<void>();

  onLogout() {
    this.logout.emit();
  }
}
