import { Component, input, Input } from '@angular/core';

@Component({
  selector: 'app-dashboard-item',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-item.component.html',
  styleUrl: './dashboard-item.component.css',
  // host: {
  //   class: 'dashboard-item',
  //   id:
  // }
})
export class DashboardItemComponent {
  // @Input({ required: true }) image!: { src: ''; alt: '' };
  // @Input({required: true}) title!: string;

  image = input.required<{ src: string; alt: string }>();
  title = input.required<string>();
}
