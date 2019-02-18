import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

import { User } from '../../../auth/models/user';
import { AuthService } from './../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$: Observable<User>;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user$ = this.authService.isAuthenticated$.pipe(
      mergeMap((isAuthenticated) => isAuthenticated ? this.authService.getUserInfo() : of(null))
    );
  }

  login() {
    this.navigateToLoginPage();
  }

  logout() {
    this.authService.logout();
    this.navigateToLoginPage();
  }

  private navigateToLoginPage() {
    this.router.navigate(['/login']);
  }
}
