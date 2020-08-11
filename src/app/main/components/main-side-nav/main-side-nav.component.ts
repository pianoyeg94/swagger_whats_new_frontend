import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main-side-nav',
  templateUrl: './main-side-nav.component.html',
  styleUrls: ['./main-side-nav.component.scss']
})
export class MainSideNavComponent {
  @Input() swaggerProjectsPageLink: string;
  @Input() vcsAccountsPageLink: string;
  @Input() companyPageLink: string;
  @Input() userProfilePageLink: string;
  @Input() getHelpPageLink: string;
}



