import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { CompanyResponse } from './response-models/company-response';


@Injectable({ providedIn: 'root' })
export class CompanyHttpService {

  constructor(private http: HttpClient) {}

  loadCompany() {
    return this.http.get<CompanyResponse>(`${environment.apiUrl}/company/`);
  }

  updateCompanyDetails(companyName: string) {
    return this.http.put<CompanyResponse>(
      `${environment.apiUrl}/company/`,
      { company_name: companyName }
    );
  }

  deleteCompany() {
    return this.http.delete(`${environment.apiUrl}/company/`);
  }
}
