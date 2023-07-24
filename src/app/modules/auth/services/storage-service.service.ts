import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  private jwt!: string;
  private rememberMe!: boolean;
  private userId!: string;

  constructor() {}

  private setLocalStorageUser(): void {
    localStorage.setItem('jwt', this.jwt);
    localStorage.setItem('_id', this.userId);
  }

  private setSessionStorageUser(): void {
    sessionStorage.setItem('jwt', this.jwt);
    sessionStorage.setItem('_id', this.userId);
  }

  public setUser(token: string, rememberMe: boolean, userId: string): void {
    this.jwt = token;
    this.rememberMe = rememberMe;
    this.userId = userId;
    if (rememberMe) {
      this.setLocalStorageUser();
    } else {
      this.setSessionStorageUser();
    }
  }

  public removeUser(): void {
    localStorage.clear();
    sessionStorage.clear();
    this.jwt = '';
    this.userId = '';
  }

  public setUserData(jwt: string, userId: string): void {
    this.jwt = jwt;
    this.userId = userId;
  }

  public getJwt(): string {
    return this.jwt;
  }

  public updateJwt(jwt: string): void {
    localStorage.clear();
    sessionStorage.clear();
    this.jwt = jwt;
    if (this.rememberMe) {
      localStorage.setItem('jwt', jwt);
    } else {
      sessionStorage.setItem('jwt', jwt);
    }
  }

  public getUserId() {
    if (this.userId) {
      return this.userId;
    }
    if (localStorage.getItem('_id')) {
      return localStorage.getItem('_id') || '';
    } else {
      return sessionStorage.getItem('_id') || '';
    }
  }
}
