import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/modules/auth/services/storage-service.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardGuard implements CanActivate {
  constructor(private storageService: StorageService, private router: Router) {}
  canActivate(): boolean {
    if (this.storageService.getJwt()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
