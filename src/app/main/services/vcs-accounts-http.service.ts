import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';

import { RemoteVCSAccountFromServer, RemoteVCSAccountsResponse } from './response-models/vcs-accounts-response';
import { RemoteVCSAccount } from '../models/vcs-account.model';

@Injectable({ providedIn: 'root' })
export class VCSAccountsHttpService {
  validateVcsAccountExistenceUrls = {
    GH: (accountName) => `https://api.github.com/users/${accountName}`,
    BB: null
  };

  constructor(private http: HttpClient) {}

  loadVCSAccounts() {
    return this.http.get<RemoteVCSAccountsResponse>(
      `${environment.apiUrl}/vcs-accounts/`
    );
  }

  loadVCSAccount(vcsAccountId: number) {
    return this.http.get<RemoteVCSAccountFromServer>(
      `${environment.apiUrl}/vcs-accounts/${vcsAccountId}/`
    );
  }

  registerVCSAccount(remoteVcsAccount: RemoteVCSAccount) {
    return this.http.post<RemoteVCSAccountFromServer>(
      `${environment.apiUrl}/vcs-accounts/`,
      {
        remote_vcs_service: remoteVcsAccount.service,
        account_type: remoteVcsAccount.accountType,
        account_name: remoteVcsAccount.accountName,
        temporary_token: remoteVcsAccount.tempToken
      }
    );
  }

  deleteVCSAccount(vcsAccountId: number) {
    return this.http.delete(`${environment.apiUrl}/vcs-accounts/${vcsAccountId}/`);
  }

  checkVCSAccountIsNotTaken(vcsService: string, accountType: string, accountName: string) {
    return this.http.post<{ vcs_account_exists: boolean }>(
      `${environment.apiUrl}/utility/vcs-account-exists/`,
      {
        remote_vcs_service: vcsService,
        account_type: accountType,
        account_name: accountName
      }
    );
  }

  checkVCSAccountExists(vcsService: string, accountName: string) {
    if (!this.validateVcsAccountExistenceUrls[vcsService]) {
      return of({ status: 200 });
    }
    return this.http.get<any>(
      this.validateVcsAccountExistenceUrls[vcsService](accountName),
      { headers: { skipAuthInterceptor: 'true' }, observe: 'response' }
    );
  }
}
