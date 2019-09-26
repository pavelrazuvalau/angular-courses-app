import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/guards/auth.guard';
import { NotFoundPageComponent } from './core/pages/not-found-page/not-found-page.component';

const routes: Route[] = [
  {
    path: 'courses',
    loadChildren: './courses/courses.module#CoursesModule',
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
    data: {
      breadcrumb: { name: 'Courses', url: '/courses' }
    }
  },
  { path: 'login', loadChildren: './login/login.module#LoginModule' },
  { path: '', redirectTo: 'courses', pathMatch: 'full' },
  { path: '**', component: NotFoundPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
