import { Component, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { FilterByPipe } from '../../pipes/filter-by.pipe';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.scss']
})
export class CourseListComponent implements OnInit {
  courses: Course[];
  filteredCourses: Course[];
  hasMoreCourses: boolean;
  searchCriteria: string;

  constructor(private courseService: CourseService, private filterByPipe: FilterByPipe<Course>) {}

  ngOnInit() {
    this.courseService.getCourses().subscribe(({ courses, hasMoreCourses }) => {
      this.courses = courses;
      this.hasMoreCourses = hasMoreCourses;
      this.filter();
    });
  }

  filter() {
    this.filteredCourses = this.filterByPipe.transform(this.courses, 'title', this.searchCriteria);
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
