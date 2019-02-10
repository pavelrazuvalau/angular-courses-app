import { CourseService } from './../../services/course.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course';
import { BreadcrumbsService } from 'src/app/core/services/breadcrumbs.service';
import { BreadcrumbsSegment } from 'src/app/core/models/breadcrumbs-segment';

@Component({
  selector: 'app-edit-course-page',
  templateUrl: './edit-course-page.component.html',
  styleUrls: ['./edit-course-page.component.scss']
})
export class EditCoursePageComponent implements OnInit {
  course: Course;

  constructor(private courseService: CourseService,
              private route: ActivatedRoute,
              private router: Router,
              private breadcrumbsService: BreadcrumbsService) { }

  ngOnInit() {
    this.course = this.route.snapshot.data['course'];

    const segments: BreadcrumbsSegment[] = [];
    let currentRoute = this.route.snapshot.parent;

    segments.unshift({ name: this.course.title });

    while (currentRoute && currentRoute.data && currentRoute.data.breadcrumb) {
      segments.unshift(currentRoute.data.breadcrumb);
      currentRoute = currentRoute.parent;
    }

    this.breadcrumbsService.updateSegments(segments);
  }

  onSubmit(course: Course) {
    this.courseService.updateItem(course).subscribe(() => {
      this.navigateHome();
    });
  }

  navigateHome() {
    this.router.navigate(['/']);
  }

}
