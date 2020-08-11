import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';


export interface CompanyMembershipPermissionsResponse {
  register_vcs_accounts: number;
  create_swagger_projects: number;
  invite_new_users: number;
}

@Injectable({ providedIn: 'root' })
export class MainHttpService {

  constructor(private http: HttpClient) {}

  loadCompanyMembershipPermissions() {
    return this.http.get<CompanyMembershipPermissionsResponse>(
      `${environment.apiUrl}/company/membership-permissions/`
    );
  }
}
