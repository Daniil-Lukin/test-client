import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, catchError, switchMap, tap, throwError } from 'rxjs';
import { StorageService } from '../modules/auth/services/storage-service.service';
import { AuthService } from '../modules/auth/services/auth.service';

@Injectable()
export class JwtInterceptorInterceptor implements HttpInterceptor {
  private registrationEndpoints: string[] = [
    '/auth',
    '/registrate',
    '/login',
    '/logout',
  ];
  private isRefreshing: boolean = false;

  constructor(
    private storageService: StorageService,
    private authService: AuthService
  ) {}

  intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    if (!this.checkEndpoint(request.url)) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.storageService.getJwt()}`,
        },
      });
    }
    return next.handle(request).pipe(
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          return this.handle401(request, next);
        }
        return throwError(() => error);
      })
    );
  }

  private checkEndpoint(url: string): boolean {
    return this.registrationEndpoints.some((element) => url.endsWith(element));
  }

  private handle401(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;

      if (this.storageService.getJwt()) {
        return this.authService.refresh(this.storageService.getUserId()).pipe(
          switchMap(() => {
            this.isRefreshing = false;

            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;
            return throwError(() => error);
          })
        );
      }
    }
    return throwError(() => new Error(`IDK what happends`));
  }
}
