import { Injectable } from '@angular/core';
import { CanLoad, CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanLoad, CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canLoad(): boolean {
    return this.isAuthenticated();
  }

  canActivate(): boolean {
    return this.isAuthenticated();
  }

  private isAuthenticated() {
    if (this.authService.isAuthenticated()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }

}
