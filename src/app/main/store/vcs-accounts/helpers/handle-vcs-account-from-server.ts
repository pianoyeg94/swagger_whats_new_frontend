import { RemoteVCSAccountFromServer } from '../../../services/response-models/vcs-accounts-response';


export const handleVCSAccountFromServer = (response: RemoteVCSAccountFromServer) => ({
  remoteVCSAccount: {
    id: response.id,
    service: response.remote_vcs_service,
    accountType: response.account_type,
    accountName: response.account_name,
    registeredAt: new Date(response.created_at).toLocaleString()
  }
});
