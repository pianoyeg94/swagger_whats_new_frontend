import { SwaggerProjectFromServer } from '../../../services/response-models/swagger-projects-response';
import { SwaggerProject } from '../../../models/swagger-project.model';


export const handleSwaggerProjectFromServer = (
  response: SwaggerProjectFromServer
): { swaggerProject: SwaggerProject } => {
  const remoteVcsAccount = response.remote_vcs_account !== null ? {
    vcsService: response.remote_vcs_account.remote_vcs_service,
    accountName: response.remote_vcs_account.account_name
  } : null;

  const swaggerProject: SwaggerProject = {
    id: response.id,
    projectName: response.project_name,
    projectOwnerId: response.project_owner_id,
    useVcs: response.use_vcs,
    remoteVcsAccount,
    remoteRepoName: response.remote_repo_name,
    remoteRepoBranch: response.remote_repo_branch,
    swaggerFileUrl: response.swagger_file_url,
    createdAt: new Date(response.created_at).toLocaleString(),
    updatedAt: new Date(response.updated_at).toLocaleString(),
    swaggerFileChangeIds: null
  };
  return { swaggerProject };
};
