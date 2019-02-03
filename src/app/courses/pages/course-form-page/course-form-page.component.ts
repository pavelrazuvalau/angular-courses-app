import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material';

@Component({
  selector: 'app-course-form',
  templateUrl: './course-form-page.component.html',
  styleUrls: ['./course-form-page.component.scss']
})
export class CourseFormPageComponent {
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  inputCourse = {
    title: null,
    creationDate: null,
    duration: null,
    description: null,
    authors: []
  };

  constructor(private router: Router, private route: ActivatedRoute) { }

  addAuthor(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.inputCourse.authors.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
  }

  removeAuthor(author: string) {
    const index = this.inputCourse.authors.indexOf(author);

    if (index >= 0) {
      this.inputCourse.authors.splice(index, 1);
    }
  }

  onSubmit() {
    console.log('create course', this.inputCourse);
  }

  onCancel() {
    this.router.navigate(['../'], {relativeTo: this.route});
  }
}
