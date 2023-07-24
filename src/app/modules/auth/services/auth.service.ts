import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { AuthResponse } from 'src/app/core/interfaces/auth/auth-response';
import { environment } from 'src/environments/environment.development';
import { StorageService } from './storage-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private httpClient: HttpClient,
    private storageService: StorageService
  ) {}

  public signIn(email: string, password: string) {
    return this.httpClient.post<AuthResponse>(
      `${environment.apiUrl}/auth/login`,
      {
        email: email,
        password: password,
      }
    );
  }

  public registrate(email: string, password: string) {
    return this.httpClient.post<AuthResponse>(
      `${environment.apiUrl}/auth/registration`,
      {
        email: email,
        password: password,
      }
    );
  }

  public deleteUser(id: string) {
    return this.httpClient.delete(`${environment.apiUrl}/auth/${id}`);
  }

  public refresh(id: string) {
    return this.httpClient
      .get<AuthResponse>(`${environment.apiUrl}/auth/refresh/${id}`)
      .pipe(
        map((response) => {
          this.storageService.setUserData(response.accessToken, response._id);
        })
      );
  }
}
