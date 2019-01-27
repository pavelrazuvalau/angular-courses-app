import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  { path: 'courses', loadChildren: './courses/courses.module#CoursesModule' },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
];
