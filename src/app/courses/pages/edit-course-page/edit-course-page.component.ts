import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course';
import { Store } from '@ngrx/store';
import { CoursesState } from '../../reducers/courses.reducer';
import { EditCourseAction } from '../../actions/courses.actions';

@Component({
  selector: 'app-edit-course-page',
  templateUrl: './edit-course-page.component.html',
  styleUrls: ['./edit-course-page.component.scss']
})
export class EditCoursePageComponent implements OnInit {
  course: Course;

  constructor(private store: Store<CoursesState>,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];
  }

  onSubmit(course: Course) {
    this.store.dispatch(new EditCourseAction(course));
  }

}
