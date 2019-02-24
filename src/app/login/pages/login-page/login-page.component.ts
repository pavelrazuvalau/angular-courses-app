import { Component } from '@angular/core';

import { Store, select } from '@ngrx/store';

import { AuthState } from 'src/app/auth/reducers/auth.reducer';
import { loginErrorMessage } from './../../../auth/reducers/auth.reducer';
import { LogInAction } from 'src/app/auth/actions/auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  userName: string;
  password: string;
  errorMessage$ = this.store.pipe(select(loginErrorMessage));

  constructor(private store: Store<AuthState>) {}

  login() {
    this.store.dispatch(new LogInAction({ login: this.userName, password: this.password }));
  }

}
