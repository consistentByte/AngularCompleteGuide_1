import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
  signal,
} from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent, RouterLink],
})
export class TasksComponent implements OnInit {
  userId = input.required<string>();
  private taskService = inject(TasksService);
  private activatedRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  // order = input<'asc' | 'desc'>(); // getting queryParams using input approach. This works since the setup for getting url info like path param or queryParam was already done before.
  // not required since query params are optional.
  // order?: 'asc' | 'desc';
  order = signal<'asc' | 'desc'>('desc');

  userTasks = computed(() =>
    this.taskService
      .allTasks()
      .filter((task) => task.userId === this.userId())
      .sort((a, b) => {
        if (this.order() === 'desc') {
          return a.id > b.id ? -1 : 1;
        } else {
          return a.id > b.id ? 1 : -1;
        }
      })
  );

  ngOnInit() {
    const sub = this.activatedRoute.queryParams.subscribe({
      // next: (params) => (this.order = params['order']),
      next: (params) => this.order.set(params['order']),
    });
    this.destroyRef.onDestroy(() => {
      sub.unsubscribe();
    });
  }
}

/*
  Accessing Parent Route Data From Inside Nested Routes:
    we can get it by both, input or Activated route method.

    Activated Route approach would work straight away.
    But input approach won't work for child routes out of the box just by 
      user = input.required<string>();
      as by default child routes do not receive those path parameters as input.
      For this we have to explicitly tell angular about this by passing additional config to provideRouter,
        withRouterConfig(),
        In withRouterConfig we can pass a config object and set paramsInheritanceStrategy: 'always'
      After this the dynamic path param values are injected into child routes.

  We can use input or activated route approach to fetch the queryparams as well.

*/
