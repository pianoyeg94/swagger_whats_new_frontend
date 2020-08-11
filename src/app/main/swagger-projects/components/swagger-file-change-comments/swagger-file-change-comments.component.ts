import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';

import { SwaggerFileChange } from '../../../models/swagger-file-change.model';
import { User } from '../../../../auth/models/user.model';

@Component({
  selector: 'app-swagger-file-change-comments',
  templateUrl: './swagger-file-change-comments.component.html',
  styleUrls: ['./swagger-file-change-comments.component.scss']
})
export class SwaggerFileChangeCommentsComponent {
  @Input() swaggerFileChange$: Observable<SwaggerFileChange>;
  @Input() user$: Observable<User>;
}
