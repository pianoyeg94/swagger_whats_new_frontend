import { RemoteVCSAccountsResponse } from '../../../services/response-models/vcs-accounts-response';
import { RemoteVCSAccount } from '../../../models/vcs-account.model';


export const handleVCSAccountsFromServer = (response: RemoteVCSAccountsResponse) => {
  const remoteVCSAccounts: RemoteVCSAccount[] = [];
  for (const account of response.results) {
    remoteVCSAccounts.push({
      id: account.id,
      service: account.remote_vcs_service,
      accountType: account.account_type,
      accountName: account.account_name,
      registeredAt: new Date(account.created_at).toLocaleString()
    });
  }
  return { remoteVCSAccounts };
};
