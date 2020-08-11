import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { SwaggerFileChange } from '../../../models/swagger-file-change.model';

@Component({
  selector: 'app-swagger-file-change-related-commit-details',
  templateUrl: './swagger-file-change-related-commit-details.component.html',
  styleUrls: ['./swagger-file-change-related-commit-details.component.scss']
})
export class SwaggerFileChangeRelatedCommitDetailsComponent {
  @Input() swaggerFileChange$: Observable<SwaggerFileChange>;
}
