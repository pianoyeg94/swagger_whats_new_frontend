import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SwaggerProjectsRoutingModule } from './swagger-projects-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { CreateSwaggerProjectComponent } from './components/pages/create-swagger-project/create-swagger-project.component';
import { SwaggerProjectsListComponent } from './components/pages/swagger-projects-list/swagger-projects-list.component';
import { SwaggerProjectDetailComponent } from './components/swagger-project-detail/swagger-project-detail.component';
import { SwaggerFileChangesListComponent } from './components/swagger-file-changes-list/swagger-file-changes-list.component';
import { SwaggerProjectDetailsPageComponent } from './components/pages/swagger-project-details-page/swagger-project-details-page.component';
import { SwaggerFileChangesFilterComponent } from './components/swagger-file-changes-filter/swagger-file-changes-filter.component';
import { SwaggerFileChangeDetailComponent } from './components/pages/swagger-file-change-detail/swagger-file-change-detail.component';
import { SwaggerFileChangesContainerComponent } from './components/swagger-file-changes-container/swagger-file-changes-container.component';
import { SwaggerFileChangeRelatedCommitDetailsComponent } from './components/swagger-file-change-related-commit-details/swagger-file-change-related-commit-details.component';
import { SwaggerFileChangeCommentsComponent } from './components/swagger-file-change-comments/swagger-file-change-comments.component';
import { SwaggerFileChangeCommentCreateFormComponent } from './components/swagger-file-change-comment-create-form/swagger-file-change-comment-create-form.component';
import { SwaggerFileChangeCommentsListComponent } from './components/swagger-file-change-comments-list/swagger-file-change-comments-list.component';
import { SwaggerFileChangeDetailMainSectionComponent } from './components/swagger-file-change-detail-main-section/swagger-file-change-detail-main-section.component';


@NgModule({
  declarations: [
    CreateSwaggerProjectComponent,
    SwaggerProjectsListComponent,
    SwaggerProjectDetailComponent,
    SwaggerFileChangesListComponent,
    SwaggerProjectDetailsPageComponent,
    SwaggerFileChangesFilterComponent,
    SwaggerFileChangeDetailComponent,
    SwaggerFileChangesContainerComponent,
    SwaggerFileChangeRelatedCommitDetailsComponent,
    SwaggerFileChangeCommentsComponent,
    SwaggerFileChangeCommentCreateFormComponent,
    SwaggerFileChangeCommentsListComponent,
    SwaggerFileChangeDetailMainSectionComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SwaggerProjectsRoutingModule,
    SharedModule
  ]
})
export class SwaggerProjectsModule {}
