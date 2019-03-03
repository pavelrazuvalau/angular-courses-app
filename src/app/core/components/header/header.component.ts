import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store, select } from '@ngrx/store';

import { AuthState } from 'src/app/auth/reducers/auth.reducer';
import { currentUser } from './../../../auth/reducers/auth.reducer';
import { LogOutAction } from 'src/app/auth/actions/auth.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  user$ = this.store.pipe(select(currentUser));

  constructor(private router: Router, private store: Store<AuthState>) {}

  login() {
    this.router.navigate(['/login']);
  }

  logout() {
    this.store.dispatch(new LogOutAction());
  }
}
