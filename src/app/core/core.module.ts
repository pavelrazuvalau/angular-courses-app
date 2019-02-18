import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule, MatProgressSpinnerModule } from '@angular/material';

import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoComponent } from './components/logo/logo.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { NotFoundPageComponent } from './pages/not-found-page/not-found-page.component';

import { BreadcrumbsService } from './services/breadcrumbs.service';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { APIInterceptor } from './interceptors/api.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  LogoComponent,
  BreadcrumbsComponent,
  LoadingSpinnerComponent,
  NotFoundPageComponent,
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ],
  declarations: [
    ...COMPONENTS,
  ],
  exports: [
    ...COMPONENTS
  ],
  providers: [
    BreadcrumbsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: APIInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ]
})
export class CoreModule { }
