import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { shareReplay, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../../store/app.reducer';
import { MainActions } from '../../../../store/main/action-types';
import { selectUser } from '../../../../../auth/store/auth.selectors';
import { SwaggerProject } from '../../../../models/swagger-project.model';
import { User } from '../../../../../auth/models/user.model';
import { SwaggerFileChange } from '../../../../models/swagger-file-change.model';
import { selectSwaggerProjectById } from '../../../../store/swagger-projects/swagger-projects.selectors';
import { selectSwaggerFileChangeById } from '../../../../store/swagger-file-changes/swagger-file-changes.selectors';


@Component({
  selector: 'app-swagger-file-change-detail',
  templateUrl: './swagger-file-change-detail.component.html',
  styleUrls: ['./swagger-file-change-detail.component.scss']
})
export class SwaggerFileChangeDetailComponent implements OnInit {
  swaggerProject$: Observable<SwaggerProject>;
  swaggerFileChange$: Observable<SwaggerFileChange>;
  user$: Observable<User>;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.swaggerProject$ = this.route.params.pipe(
      switchMap(params => this.store.select(selectSwaggerProjectById(
        params['projectId']))
      ),
      shareReplay()
    );

    this.swaggerFileChange$ = this.route.params.pipe(
      switchMap(params => this.store.select(selectSwaggerFileChangeById(
        params['swaggerFileChangeId']))
      ),
      tap(swaggerFileChange => {
        if (!swaggerFileChange) {
          this.router.navigateByUrl('/swagger-projects');
        }
      }),
      tap(swaggerFileChange => this.store.dispatch(MainActions.ContentChange({
          pageTitle: `Changes Registered At: ${swaggerFileChange.changesAddedAt}`
        }))
      ),
      shareReplay()
    );

    this.user$ = this.store.select(selectUser);
  }
}
