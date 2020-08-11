import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { SwaggerProject } from '../models/swagger-project.model';
import { SwaggerProjectFromServer, SwaggerProjectsResponse } from './response-models/swagger-projects-response';


@Injectable({ providedIn: 'root' })
export class SwaggerProjectsHttpService {

  constructor(private http: HttpClient) {}

  loadSwaggerProjects(pageNumber: number, pageSize: number, allIdsListRepr: number[]) {
    return this.http.get<SwaggerProjectsResponse>(
      `${environment.apiUrl}/swagger-projects/`,
      {
        params: {
          page: pageNumber.toString(),
          page_size: pageSize.toString()
        }
      }
    ).pipe(
      map(response => ({ response, pageNumber, pageSize, allIdsListRepr }))
    );
  }

  loadSwaggerProject(swaggerProjectId: number) {
    return this.http.get<SwaggerProjectFromServer>(
      `${environment.apiUrl}/swagger-projects/${swaggerProjectId}/`
    );
  }

  createSwaggerProject(swaggerProject: SwaggerProject) {
    let remoteVcsAccount;

    if (swaggerProject.remoteVcsAccount) {
      remoteVcsAccount = {
        remote_vcs_service: swaggerProject.remoteVcsAccount.vcsService,
        account_name: swaggerProject.remoteVcsAccount.accountName
      };
    } else {
      remoteVcsAccount = swaggerProject.remoteVcsAccount;
    }

    return this.http.post<SwaggerProjectFromServer>(
      `${environment.apiUrl}/swagger-projects/`,
      {
        remote_vcs_account: remoteVcsAccount,
        project_name: swaggerProject.projectName,
        swagger_file_url: swaggerProject.swaggerFileUrl,
        use_vcs: swaggerProject.useVcs,
        remote_repo_name: swaggerProject.remoteRepoName,
        remote_repo_branch: swaggerProject.remoteRepoBranch
      }
    );
  }

  deleteSwaggerProject(swaggerProjectId: number) {
    return this.http.delete(`${environment.apiUrl}/swagger-projects/${swaggerProjectId}/`);
  }

  checkSwaggerProjectNameIsUnique(projectName: string) {
    return this.http.post<{ swagger_project_name_taken: boolean }>(
      `${environment.apiUrl}/utility/swagger-project-exists/`,
      { project_name: projectName }
    );
  }

  checkRemoteRepoBranchIsUnique(
    vcsAccountId: number,
    remoteRepoName: string,
    remoteRepoBranch: string
  ) {
    return this.http.post<{ branch_already_registered: boolean }>(
      `${environment.apiUrl}/utility/remote-repo-branch-exists/`,
      {
        remote_vcs_account_id: vcsAccountId,
        remote_repo_name: remoteRepoName,
        remote_repo_branch: remoteRepoBranch
      }
    );
  }
}
