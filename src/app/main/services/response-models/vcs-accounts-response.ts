export interface RemoteVCSAccountFromServer {
  id: number;
  remote_vcs_service: string;
  account_type: string;
  account_name: string;
  created_at: string;
}

export interface RemoteVCSAccountsResponse {
  count: number;
  next: string;
  previous: string;
  results: RemoteVCSAccountFromServer[];
}
