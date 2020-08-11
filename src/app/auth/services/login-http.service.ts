import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { AuthResponse } from './response-models/auth-response';
import { AccessTokenRefreshResponse } from './response-models/access-token-refresh-response';


@Injectable({ providedIn: 'root' })
export class LoginHttpService {

  constructor(private http: HttpClient) {}

  login(email: string, password: string) {
    return this.http.post<AuthResponse>(
      `${environment.apiUrl}/login/`,
      { email, password }
    );
  }

  refreshAccessToken(refreshToken: string) {
    return this.http.post<AccessTokenRefreshResponse>(
      `${environment.apiUrl}/access-token-refresh/`,
      { refresh: refreshToken }
    );
  }
}

