import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { CompanyMemberFromServer, CompanyMembersResponse } from './response-models/company-members-response';


@Injectable({ providedIn: 'root' })
export class CompanyMembersHttpService {

  constructor(private http: HttpClient) {}

  loadCompanyMembers(pageNumber: number, pageSize: number, allIdsListRepr: number[]) {
    return this.http.get<CompanyMembersResponse>(
      `${environment.apiUrl}/users/`,
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

  loadCompanyMember(companyMemberId: number) {
    return this.http.get<CompanyMemberFromServer>(
      `${environment.apiUrl}/users/${companyMemberId}/`
    );
  }

  inviteCompanyMember(email: string, companyMembershipPermissions: number) {
    return this.http.post<{}>(
      `${environment.apiUrl}/company/invitation/`,
      { email, desired_company_permissions: companyMembershipPermissions }
    );
  }

  updateCompanyMember(companyMemberId: number, companyMembershipPermissions: number) {
    return this.http.put<{ id: number, permissions: number }>(
      `${environment.apiUrl}/users/${companyMemberId}/update-company-membership-permissions/`,
      { permissions: companyMembershipPermissions }
    );
  }

  deleteCompanyMember(companyMemberId: number) {
    return this.http.delete(`${environment.apiUrl}/users/${companyMemberId}/`);
  }
}


