import { Routes } from '@angular/router';
import { CourseListPageComponent } from './pages/course-list-page/course-list-page.component';
import { CourseFormPageComponent } from './pages/course-form-page/course-form-page.component';

export const routes: Routes = [
  {
    path: '',
    component: CourseListPageComponent
  },
  {
    path: 'create',
    component: CourseFormPageComponent
  }
];
