import { CourseListComponent } from './course-list/components/course-list/course-list.component';
import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  { path: 'courses', component: CourseListComponent },
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
];
