import { SwaggerProjectsResponse } from '../../../services/response-models/swagger-projects-response';


export const handleSwaggerProjectsFromServer = (
  response: SwaggerProjectsResponse,
  pageNumber: number,
  pageSize: number,
  allIdsListRepr: number[]
) => {
  const swaggerProjects = [];
  const ids = [];

  for (const project of response.results) {
    const remoteVcsAccount = project.remote_vcs_account !== null ? {
      vcsService: project.remote_vcs_account.remote_vcs_service,
      accountName: project.remote_vcs_account.account_name
    } : null;

    ids.push(project.id);
    swaggerProjects.push({
      id: project.id,
      projectName: project.project_name,
      projectOwnerId: project.project_owner_id,
      useVcs: project.use_vcs,
      remoteVcsAccount,
      remoteRepoName: project.remote_repo_name,
      remoteRepoBranch: project.remote_repo_branch,
      swaggerFileUrl: project.swagger_file_url,
      createdAt: new Date(project.created_at).toLocaleString(),
      updatedAt: new Date(project.updated_at).toLocaleString(),
      swaggerFileChangeIds: null
    });
  }

  const from = (pageNumber - 1) * pageSize;
  allIdsListRepr = allIdsListRepr === null
    ? new Array(response.count).fill(null)
    : [...allIdsListRepr];
  allIdsListRepr.splice(from, pageSize, ...ids);

  return {
    swaggerProjects,
    overallEntitiesCount: response.count,
    numberOfEntitiesLoaded: swaggerProjects.length,
    currentPageNumber: pageNumber,
    currentPageSize: pageSize,
    allIdsListRepr
  };
};
