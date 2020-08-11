import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SwaggerProjectsListComponent } from './components/pages/swagger-projects-list/swagger-projects-list.component';
import { SwaggerProjectsResolver } from './resolvers/swagger-projects.resolver';
import { SwaggerProjectOwnerResolver } from './resolvers/swagger-project-owner.resolver';
import { SwaggerProjectResolver } from './resolvers/swagger-project.resolver';
import { SwaggerFileChangesResolver } from './resolvers/swagger-file-changes.resolver';
import { CreateSwaggerProjectComponent } from './components/pages/create-swagger-project/create-swagger-project.component';
import { HasCompanyMembershipPermissionsGuard } from '../../guards/has-permissions.guard';
import { SwaggerProjectDetailsPageComponent } from './components/pages/swagger-project-details-page/swagger-project-details-page.component';
import { SwaggerFileChangeDetailComponent } from './components/pages/swagger-file-change-detail/swagger-file-change-detail.component';


const routes: Routes = [
  {
    path: '',
    component: SwaggerProjectsListComponent,
    resolve: {
      swaggerProjects: SwaggerProjectsResolver
    },
  },
  {
    path: 'create',
    component: CreateSwaggerProjectComponent,
    canActivate: [HasCompanyMembershipPermissionsGuard],
    data: {
      companyMembershipPermission: 'createSwaggerProjects',
      redirectOnAccessDeniedUrl: '/swagger-projects'
    }
  },
  {
    path: ':projectId',
    component: SwaggerProjectDetailsPageComponent,
    resolve: {
      swaggerProject: SwaggerProjectResolver,
      swaggerFileChanges: SwaggerFileChangesResolver,
      swaggerProjectOwner: SwaggerProjectOwnerResolver
    }
  },
  {
    path: ':projectId/swagger-file-changes/:swaggerFileChangeId',
    component: SwaggerFileChangeDetailComponent,
    resolve: {
      swaggerProject: SwaggerProjectResolver,
      swaggerFileChanges: SwaggerFileChangesResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SwaggerProjectsRoutingModule {}
