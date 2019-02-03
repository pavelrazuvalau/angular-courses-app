import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseListPageComponent } from './pages/course-list-page/course-list-page.component';
import { CourseItemComponent } from './components/course-item/course-item.component';

import { RouterModule } from '@angular/router';
import { routes } from './courses.routes';

import {
  MatButtonModule,
  MatInputModule,
  MatCardModule,
  MatIconModule,
  MatDialogModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatChipsModule
} from '@angular/material';

import { MinutesToTimePipe } from './pipes/minutes-to-time.pipe';
import { CreationDateStatusDirective } from './directives/creation-date-status.directive';
import { FilterByPipe } from './pipes/filter-by.pipe';
import { OrderByPipe } from './pipes/order-by.pipe';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { CourseFormPageComponent } from './pages/course-form-page/course-form-page.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatInputModule,
    MatCardModule,
    MatIconModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatChipsModule,
    RouterModule.forChild(routes),
  ],
  declarations: [
    CourseListPageComponent,
    CourseItemComponent,
    MinutesToTimePipe,
    CreationDateStatusDirective,
    FilterByPipe,
    OrderByPipe,
    ConfirmationDialogComponent,
    CourseFormPageComponent,
  ],
  providers: [
    FilterByPipe
  ],
  entryComponents: [ConfirmationDialogComponent]
})
export class CoursesModule { }
