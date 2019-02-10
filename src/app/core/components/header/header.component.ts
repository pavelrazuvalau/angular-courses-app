import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../../../auth/models/user';
import { AuthService } from './../../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user: User;
  isAuthenticated = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;

      if (this.isAuthenticated) {
        this.user = this.authService.getUserInfo();
      } else {
        this.user = null;
      }
    });
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
