import { BreadcrumbsService } from './../../../core/services/breadcrumbs.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course';
import { BreadcrumbsSegment } from 'src/app/core/models/breadcrumbs-segment';

@Component({
  selector: 'app-create-course-page',
  templateUrl: './create-course-page.component.html',
  styleUrls: ['./create-course-page.component.scss']
})
export class CreateCoursePageComponent implements OnInit {
  constructor(private courseService: CourseService,
              private router: Router,
              private route: ActivatedRoute,
              private breadcrumbsService: BreadcrumbsService) { }

  ngOnInit(): void {
    const segments: BreadcrumbsSegment[] = [];
    let currentRoute = this.route.snapshot.parent;

    while (currentRoute && currentRoute.data && currentRoute.data.breadcrumb) {
      segments.unshift(currentRoute.data.breadcrumb);
      currentRoute = currentRoute.parent;
    }

    this.breadcrumbsService.updateSegments(segments);
  }

  onSubmit(course: Course) {
    this.courseService.createCourse(course).subscribe(() => {
      this.navigateHome();
    });
  }

  navigateHome() {
    this.router.navigate(['/']);
  }
}
