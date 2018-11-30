import { Component } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  user: User;

  login() {
    // some magic stuff here
  }

  logout() {
    // some magic stuff here
  }
}
