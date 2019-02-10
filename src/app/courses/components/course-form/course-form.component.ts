import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

import { Course } from '../../models/course';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-form.component.scss']
})
export class CourseFormComponent {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() course: Course = {
    title: null,
    creationDate: null,
    duration: null,
    description: null,
    authors: []
  };

  @Output() submit = new EventEmitter<Course>();
  @Output() cancel = new EventEmitter();

  addAuthor(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value.trim();

    if ((value || '')) {
      this.course.authors.push(value);
    }

    if (input) {
      input.value = '';
    }
  }

  removeAuthor(author: string): void {
    const index = this.course.authors.indexOf(author);

    if (index >= 0) {
      this.course.authors.splice(index, 1);
    }
  }

  onSubmit(): void {
    this.submit.emit(this.course);
  }

  onCancel(): void {
    this.cancel.emit();
  }
}

