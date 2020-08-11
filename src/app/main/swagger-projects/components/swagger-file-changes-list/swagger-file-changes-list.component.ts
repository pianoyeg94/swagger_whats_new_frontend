import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../store/app.reducer';
import { SwaggerFileChange } from '../../../models/swagger-file-change.model';
import { selectSwaggerFileChangesForSwaggerProject } from '../../../store/swagger-file-changes/swagger-file-changes.selectors';

@Component({
  selector: 'app-swagger-file-changes-list',
  templateUrl: './swagger-file-changes-list.component.html',
  styleUrls: ['./swagger-file-changes-list.component.scss']
})
export class SwaggerFileChangesListComponent implements OnInit {
  swaggerFileChanges$: Observable<SwaggerFileChange[]>;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.swaggerFileChanges$ = this.route.params.pipe(
      switchMap(params => this.store.select(selectSwaggerFileChangesForSwaggerProject(
        params['projectId'].toString()))
      )
    );
  }

  onDetailsBtnClicked(swaggerFileChange: SwaggerFileChange) {
    this.router.navigate(['swagger-file-changes', swaggerFileChange.id], { relativeTo: this.route });
  }
}
