import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { of } from 'rxjs';

import { CourseListComponent } from './course-list.component';
import { CourseService } from './../../services/course.service';
import { Course, CourseResponse } from './../../models/course';
import { CreationDateStatusDirective } from '../../directives/creation-date-status.directive';
import { FilterByPipe } from '../../pipes/filter-by.pipe';
import { OrderByPipe } from '../../pipes/order-by.pipe';

const mockCourse = {
  id: 1,
  title: 'Title 1',
  creationDate: '2018-05-09',
  duration: 34,
  description: 'Description 1'
};

@Component({
  selector: 'app-course-list-item',
  template: `
    <h1 class="course-title-stub">{{mockCourse.title}}</h1>
    <button class="edit-stub" (click)="edit.emit(mockCourse)"></button>
    <button class="remove-stub" (click)="remove.emit(mockCourse)"></button>
  `
})
class CourseListItemStubComponent {
  @Input() course: Course;
  @Output() edit = new EventEmitter<Course>();
  @Output() remove = new EventEmitter<Course>();
  mockCourse = mockCourse;
}

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;

  const mockCourses: CourseResponse = {
    courses: [
      mockCourse,
      {
        id: 2,
        title: 'Title 2',
        creationDate: '2018-05-10',
        duration: 35,
        description: 'Description 2'
      }
    ],
    hasMoreCourses: true
  };

  const mockService = {
    getCourses: jasmine.createSpy('getCourses').and.returnValue(of(mockCourses))
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CourseListComponent,
        CourseListItemStubComponent,
        CreationDateStatusDirective,
        FilterByPipe,
        OrderByPipe
      ],
      imports: [ MatButtonModule, MatIconModule, MatInputModule, FormsModule, NoopAnimationsModule ],
      providers: [{ provide: CourseService, useValue: mockService }, FilterByPipe]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    spyOn(console, 'log');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#ngOnInit', () => {
    it('should retrieve courses list', () => {
      expect(mockService.getCourses).toHaveBeenCalled();
    });

    it('should save courses data', () => {
      expect(component.courses).toEqual(mockCourses.courses);
      expect(component.hasMoreCourses).toEqual(mockCourses.hasMoreCourses);
    });
  });

  it('should render course items', () => {
    const items = fixture.debugElement.queryAll(By.css('app-course-list-item'));
    expect(items.length).toEqual(mockCourses.courses.length);
  });

  it('should not show load more button if there is no more results', () => {
    component.hasMoreCourses = false;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.course-list__load-more'));
    expect(button).toBeFalsy();
  });

  it('should show load more button if there are more results available', () => {
    component.hasMoreCourses = true;
    fixture.detectChanges();
    const button = fixture.debugElement.query(By.css('.course-list__load-more'));
    expect(button).toBeTruthy();
  });

  describe('#find', () => {
    it('should search courses', () => {
      component.searchCriteria = mockCourse.title;
      fixture.detectChanges();
      const form = fixture.debugElement.query(By.css('.course-toolbar__search form'));
      form.triggerEventHandler('submit', null);
      fixture.detectChanges();
      const items = fixture.debugElement.queryAll(By.css('.course-title-stub'));
      const filteredItems = mockCourses.courses.filter((course) => course.title.toLowerCase().includes(component.searchCriteria));
      const foundTitles = items.map((item) => item.nativeElement.innerText);
      expect(foundTitles).toEqual(filteredItems.map((item) => item.title));
    });
  });

  describe('#addCourse', () => {
    it('should add courses', () => {
      const button = fixture.debugElement.query(By.css('.course-toolbar__add-course button'));
      button.triggerEventHandler('click', null);
      expect(console.log).toHaveBeenCalledWith('adding course');
    });
  });

  describe('#loadMore', () => {
    it('should load more courses', () => {
      const button = fixture.debugElement.query(By.css('.course-list__load-more'));
      button.triggerEventHandler('click', null);
      expect(console.log).toHaveBeenCalledWith('loading more');
    });
  });

  describe('#editCourse', () => {
    it('should edit course', () => {
      const stubTrigger = fixture.debugElement.query(By.css('.edit-stub'));
      stubTrigger.triggerEventHandler('click', null);
      expect(console.log).toHaveBeenCalledWith('edit', mockCourse);
    });
  });

  describe('#removeCourse', () => {
    it('should remove course', () => {
      const stubTrigger = fixture.debugElement.query(By.css('.remove-stub'));
      stubTrigger.triggerEventHandler('click', null);
      expect(console.log).toHaveBeenCalledWith('remove', mockCourse);
    });
  });
});
