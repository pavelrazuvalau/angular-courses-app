import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: Course[];
  hasMoreCourses: boolean;
  searchCriteria: string;

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe(({ courses, hasMoreCourses }) => {
      this.courses = courses;
      this.hasMoreCourses = hasMoreCourses;
    });
  }

  find() {
    console.log('searching', this.searchCriteria);
  }

  addCourse() {
    console.log('adding course');
  }

  loadMore() {
    console.log('loading more');
  }

  editCourse(course: Course) {
    console.log('edit', course);
  }

  removeCourse(course: Course) {
    console.log('remove', course);
  }
}
