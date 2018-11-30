import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseListComponent } from './components/course-list/course-list.component';
import { CourseListItemComponent } from './components/course-list-item/course-list-item.component';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [CourseListComponent, CourseListItemComponent]
})
export class CourseListModule { }
