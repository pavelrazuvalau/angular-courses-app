import { BreadcrumbsSegment } from './../models/breadcrumbs-segment';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class BreadcrumbsService {
  segments$ = new Subject<BreadcrumbsSegment[]>();

  updateSegments(segments: BreadcrumbsSegment[]) {
    this.segments$.next(segments);
  }
}
