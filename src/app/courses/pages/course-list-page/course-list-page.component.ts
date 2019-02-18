import { Component, OnInit } from '@angular/core';
import { Course } from '../../../courses/models/course';
import { CourseService } from '../../../courses/services/course.service';
import { BreadcrumbsService } from './../../../core/services/breadcrumbs.service';
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
  courses: Course[] = [];
  searchCriteria: string;

  isLoading = false;
  hasMoreCourses = true;
  currentPage = 0;

  constructor(private courseService: CourseService,
              private breadcrumbsService: BreadcrumbsService,
              private dialog: MatDialog,
              private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit() {
    this.loadMoreCourses();

    const segments: BreadcrumbsSegment[] = [];
    let currentRoute = this.route.snapshot.parent;

    while (currentRoute && currentRoute.data && currentRoute.data.breadcrumb) {
      segments.unshift(currentRoute.data.breadcrumb);
      currentRoute = currentRoute.parent;
    }

    this.breadcrumbsService.updateSegments(segments);
  }

  loadMoreCourses() {
    if (!this.isLoading) {
      this.isLoading = true;

      this.courseService.getList(this.currentPage, this.searchCriteria).subscribe(({ courses, hasMoreCourses }) => {
        this.courses = this.courses.concat(courses);

        this.hasMoreCourses = hasMoreCourses;

        this.isLoading = false;
        this.currentPage++;
      });
    }
  }

  reloadCourses() {
    this.currentPage = 0;
    this.courses = [];
    this.loadMoreCourses();
  }

  editCourse(course: Course) {
    this.router.navigate(['courses', course.id]);
  }

  removeCourse(course: Course) {
    this.dialog.open(ConfirmationDialogComponent, {
      width: '500px'
    }).afterClosed().subscribe((isConfirmed) => {
      if (isConfirmed) {
        this.courseService.removeItem(course).subscribe(() => {
          this.reloadCourses();
        });
      }
    });
  }
}
