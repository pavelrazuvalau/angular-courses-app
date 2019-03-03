import { Component } from '@angular/core';
import { Course } from '../../models/course';
import { Store } from '@ngrx/store';
import { CoursesState } from '../../reducers/courses.reducer';
import { CreateCourseAction } from '../../actions/courses.actions';

@Component({
  selector: 'app-create-course-page',
  templateUrl: './create-course-page.component.html',
  styleUrls: ['./create-course-page.component.scss']
})
export class CreateCoursePageComponent {
  constructor(private store: Store<CoursesState>) { }

  onSubmit(course: Course) {
    this.store.dispatch(new CreateCourseAction(course));
  }
}
