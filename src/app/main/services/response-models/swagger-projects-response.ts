export interface SwaggerProjectFromServer {
  id: number;
  project_name: string;
  project_owner_id: number;
  use_vcs: boolean;
  remote_vcs_account: {
    remote_vcs_service?: string;
    account_name?: string;
  };
  remote_repo_name: string;
  remote_repo_branch: string;
  swagger_file_url: string;
  created_at: string;
  updated_at: string;
}

export interface SwaggerProjectsResponse {
  count: number,
  next: string;
  previous: string;
  results: SwaggerProjectFromServer[];
}
