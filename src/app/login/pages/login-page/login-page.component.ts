import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/services/auth.service';
import { User } from './../../../auth/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  userName: string;
  password: string;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login().subscribe((user: User) => {
      console.log(`logged in successfully as ${user.firstName} ${user.lastName}`);
      this.router.navigate(['/']);
    });
  }

}
