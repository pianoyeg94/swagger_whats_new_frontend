import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { SwaggerFileChange } from '../../../models/swagger-file-change.model';
import { SwaggerProject } from '../../../models/swagger-project.model';

@Component({
  selector: 'app-swagger-file-change-detail-main-section',
  templateUrl: './swagger-file-change-detail-main-section.component.html',
  styleUrls: ['./swagger-file-change-detail-main-section.component.scss']
})
export class SwaggerFileChangeDetailMainSectionComponent {
  @Input() swaggerFileChange$: Observable<SwaggerFileChange>;
  @Input() swaggerProject$: Observable<SwaggerProject>;

  swaggerFileChangeType: string;
  whereSwaggerFileChangeHappened: string;

  onSwaggerFileChangeTypeSelected(selectedSwaggerFileChangeType: string) {
    this.swaggerFileChangeType = selectedSwaggerFileChangeType;
  }

  onWhereSwaggerFileChangeHappenedSelected(whereSwaggerFileChangeHappened: string) {
    this.whereSwaggerFileChangeHappened = whereSwaggerFileChangeHappened;
  }
}
