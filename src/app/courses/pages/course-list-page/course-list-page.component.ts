import { Component, OnInit } from '@angular/core';
import { Course } from '../../../courses/models/course';
import { CourseService } from '../../../courses/services/course.service';
import { FilterByPipe } from '../../../courses/pipes/filter-by.pipe';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list-page.component.html',
  styleUrls: ['./course-list-page.component.scss']
})
export class CourseListPageComponent implements OnInit {
  courses: Course[];
  filteredCourses: Course[];
  hasMoreCourses: boolean;
  searchCriteria: string;

  constructor(private courseService: CourseService, private filterByPipe: FilterByPipe<Course>, private dialog: MatDialog) {}

  ngOnInit() {
    this.courseService.getList().subscribe(({ courses, hasMoreCourses }) => {
      this.courses = courses;
      this.hasMoreCourses = hasMoreCourses;
      this.filter();
    });
  }

  filter() {
    this.filteredCourses = this.filterByPipe.transform(this.courses, 'title', this.searchCriteria);
  }

  loadMore() {
    this.courseService.loadMoreCourses();
  }

  editCourse(course: Course) {
    this.courseService.updateItem(course).subscribe((updatedCourse) => {
      console.log('edit course', updatedCourse);
    });
  }

  removeCourse(course: Course) {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '500px'
    }).afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.courseService.removeItem(course).subscribe(({ id }) => {
          this.courses = this.courses.filter(_course => _course.id !== id);
          this.filter();
        });
      }
    });
  }
}
