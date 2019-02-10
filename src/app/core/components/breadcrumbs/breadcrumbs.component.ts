import { Component } from '@angular/core';
import { BreadcrumbsService } from '../../services/breadcrumbs.service';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent {
  segments$ = this.breadcrumbsService.segments$;

  constructor(private breadcrumbsService: BreadcrumbsService) {}
}
