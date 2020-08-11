import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AuthResponse } from './response-models/auth-response';


@Injectable({ providedIn: 'root' })
export class RegistrationHttpService {
  constructor(private http: HttpClient) {}

  registerCompanyAndUser(
    companyName: string,
    firstName: string,
    lastName: string,
    email: string,
    jobTitle: string,
    password: string,
    passwordConfirmation: string
  ) {
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/company/registration/`,
      {
        company: {
          company_name: companyName
        },
        user: {
          first_name: firstName,
          last_name: lastName,
          email,
          company_membership: {
            job_title: jobTitle
          },
          password,
          password_confirm: passwordConfirmation
        }
      }
    );
  }

  validateInvitationToken(invitationToken: string) {
    return this.http.get<{ company_invitation_token_valid: boolean }>(
      `${environment.apiUrl}/utility/company-invitation-token-valid/${invitationToken}/`
    );
  }

  registerUserWithInvitationToken(
    invitationToken: string,
    firstName: string,
    lastName: string,
    email: string,
    jobTitle: string,
    password: string,
    passwordConfirm: string
  ) {
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/users/registration/${invitationToken}/`,
      {
        first_name: firstName,
        last_name: lastName,
        email,
        company_membership: {
          job_title: jobTitle
        },
        password,
        password_confirm: passwordConfirm
      }
    );
  }

  confirmUserEmail(emailConfirmationToken: string) {
    return this.http.put<{}>(
      `${environment.apiUrl}/me/email-address-confirmation/${emailConfirmationToken}/`,
      {}
    );
  }
}
