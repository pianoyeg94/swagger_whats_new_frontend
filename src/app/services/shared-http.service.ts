import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class SharedHttpService {
  constructor(private http: HttpClient) {}

  validateUserEmailIsUnique(email: string) {
    return this.http.post<{ email_taken: boolean }>(
      `${environment.apiUrl}/utility/email-in-use/`,
      { email }
    );
  }

  validateCompanyNameIsUnique(companyName: string) {
    return this.http.post<{ company_name_taken: boolean }>(
      `${environment.apiUrl}/utility/company-name-in-use/`,
      { company_name: companyName }
    );
  }
}
