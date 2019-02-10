import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { CourseResponse, Course } from '../models/course';
import { coursesMock } from './course.mock';

@Injectable()
export class CourseService {
  private courseResponse = coursesMock;

  getList(): Observable<CourseResponse> {
    return of({ ...this.courseResponse });
  }

  createCourse(course: Course): Observable<Course>  {
    this.courseResponse.courses.push({ ...course, id: this.courseResponse.courses.length + 1 });
    return of(course);
  }

  getItemById(id: number): Observable<Course> {
    return of({ ...this.courseResponse.courses.find(course => course.id === id) });
  }

  updateItem(course: Course): Observable<Course> {
    const idx = this.courseResponse.courses.findIndex((_course) => _course.id === course.id);
    this.courseResponse.courses[idx] = { ...course };
    return of(this.courseResponse.courses[idx]);
  }

  removeItem(course: Course): Observable<any> {
    this.courseResponse.courses = this.courseResponse.courses.filter(_course => _course.id !== course.id);

    return of({ id: course.id });
  }

  loadMoreCourses(): void {
    console.log('create course');
  }
}
