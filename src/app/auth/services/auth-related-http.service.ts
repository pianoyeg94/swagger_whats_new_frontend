import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AuthResponse } from './response-models/auth-response';
import { UserUpdateResponse } from './response-models/user-update-response';


@Injectable({ providedIn: 'root' })
export class AuthRelatedHttpService {

  constructor(private http: HttpClient) {}

  sendPasswordResetEmail(email: string) {
    return this.http.patch(
      `${environment.apiUrl}/users/forgot-password/`,
      { email }
    );
  }

  validateResetToken(resetToken: string) {
    return this.http.get<{ password_reset_token_valid: boolean }>(
      `${environment.apiUrl}/utility/password-reset-token-valid/${resetToken}/`
    );
  }

  resetUserPassword(
    password: string,
    passwordConfirmation: string,
    resetToken: string
  ) {
    return this.http.put<AuthResponse>(
      `${environment.apiUrl}/users/reset-password/${resetToken}/`,
      { password, password_confirm: passwordConfirmation }
    );
  }

  updateUserPassword(currentPassword: string, newPassword: string, passwordConfirm: string) {
    return this.http.put<AuthResponse>(
      `${environment.apiUrl}/me/update-password/`,
      {
        current_password: currentPassword,
        password: newPassword,
        password_confirm: passwordConfirm
      }
    );
  }

  updateUser(email: string, firstName: string, lastName: string, jobTitle: string) {
    return this.http.put<UserUpdateResponse>(
      `${environment.apiUrl}/me/`,
      {
        email,
        first_name: firstName,
        last_name: lastName,
        company_membership: {
          job_title: jobTitle
        }
      }
    );
  }

  cancelUsersCompanyMembership() {
    return this.http.delete(`${environment.apiUrl}/me/`);
  }
}
