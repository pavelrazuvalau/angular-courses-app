import { Course } from './../models/course';
import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courseList: Course[] = [
    {
      id: 1,
      title: 'title1',
      creationDate: '2018-01-02',
      duration: 34,
      description: 'desc1'
    },
    {
      id: 2,
      title: 'title2',
      creationDate: '2018-02-02',
      duration: 36,
      description: 'desc2'
    },
    {
      id: 3,
      title: 'title3',
      creationDate: '2018-02-03',
      duration: 23,
      description: 'desc3'
    }
  ];

  getCourses(): Observable<Course[]> {
    return of(this.courseList);
  }
}
