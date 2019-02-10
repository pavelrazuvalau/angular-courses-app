import { Component, OnInit } from '@angular/core';
import { Course } from '../../../courses/models/course';
import { CourseService } from '../../../courses/services/course.service';
import { BreadcrumbsService } from './../../../core/services/breadcrumbs.service';
import { FilterByPipe } from '../../../courses/pipes/filter-by.pipe';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../components/confirmation-dialog/confirmation-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { BreadcrumbsSegment } from 'src/app/core/models/breadcrumbs-segment';

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

  constructor(private courseService: CourseService,
              private breadcrumbsService: BreadcrumbsService,
              private filterByPipe: FilterByPipe<Course>,
              private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.courseService.getList().subscribe(({ courses, hasMoreCourses }) => {
      this.courses = courses;
      this.hasMoreCourses = hasMoreCourses;
      this.filter();
    });

    const segments: BreadcrumbsSegment[] = [];
    let currentRoute = this.route.snapshot.parent;

    while (currentRoute && currentRoute.data && currentRoute.data.breadcrumb) {
      segments.unshift(currentRoute.data.breadcrumb);
      currentRoute = currentRoute.parent;
    }

    this.breadcrumbsService.updateSegments(segments);
  }

  filter() {
    this.filteredCourses = this.filterByPipe.transform(this.courses, 'title', this.searchCriteria);
  }

  loadMore() {
    this.courseService.loadMoreCourses();
  }

  editCourse(course: Course) {
    this.router.navigate([course.id]);
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
