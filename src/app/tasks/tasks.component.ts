import { Component, computed, inject, input } from '@angular/core';

import { TaskComponent } from './task/task.component';
import { Task } from './task/task.model';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css',
  imports: [TaskComponent],
})
export class TasksComponent {
  userId = input.required<string>();
  private taskService = inject(TasksService);

  userTasks = computed(() =>
    this.taskService.allTasks().filter((task) => task.userId === this.userId())
  );
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


*/
