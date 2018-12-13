import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

import { CourseResponse } from './../models/course';
import { coursesMock } from './course.mock';

@Injectable({
  providedIn: 'root'
})
export class CourseService {

  getCourses(): Observable<CourseResponse> {
    return of(coursesMock);
  }
}
