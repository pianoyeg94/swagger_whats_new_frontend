import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, shareReplay, switchMap, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';

import * as fromApp from '../../../../store/app.reducer';
import { SwaggerProject } from '../../../models/swagger-project.model';
import { CompanyMember } from '../../../models/company-member.model';

import { selectCompanyMemberById } from '../../../store/company-members/company-members.selectors';
import { selectSwaggerProjectById } from '../../../store/swagger-projects/swagger-projects.selectors';
import { MainActions } from '../../../store/main/action-types';
import { User } from '../../../../auth/models/user.model';
import { selectUser } from '../../../../auth/store/auth.selectors';
import { SwaggerProjectsActions } from '../../../store/swagger-projects/action-types';


@Component({
  selector: 'app-swagger-project-detail',
  templateUrl: './swagger-project-detail.component.html',
  styleUrls: ['./swagger-project-detail.component.scss']
})
export class SwaggerProjectDetailComponent implements OnInit {
  swaggerProject$: Observable<SwaggerProject>;
  swaggerProjectOwner$: Observable<CompanyMember>;
  user$: Observable<User>;

  swaggerProjectId: number;
  popupVisible = false;

  constructor(
    private store: Store<fromApp.AppState>,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.swaggerProject$ = this.route.params.pipe(
      switchMap(params => this.store.select(selectSwaggerProjectById(
        params['projectId'].toString()))
      ),
      filter(swaggerProject => swaggerProject),
      tap(swaggerProject => this.store.dispatch(MainActions.ContentChange({
        pageTitle: swaggerProject.projectName
      }))),
      tap(swaggerProject => this.swaggerProjectId = swaggerProject.id),
      shareReplay()
    );

    this.swaggerProjectOwner$ = this.swaggerProject$.pipe(
      switchMap(swaggerProject => this.store.select(
        selectCompanyMemberById(swaggerProject.projectOwnerId.toString())
      ))
    );

    this.user$ = this.store.select(selectUser);
  }

  onOpenPopup() {
    this.popupVisible = true;
  }

  onPopupClose() {
    this.popupVisible = false;
  }

  onProjectDelete() {
    this.store.dispatch(SwaggerProjectsActions.deleteSwaggerProject({
      swaggerProjectId: this.swaggerProjectId
    }));
    this.router.navigateByUrl('swagger-projects');
  }
}
