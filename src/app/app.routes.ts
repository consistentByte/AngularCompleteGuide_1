import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';

export const routes: Routes = [
  {
    path: '', // <domain>
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId', // <domain>/users/<uid>, :___ => dynamic part
    component: UserTasksComponent,
  },
  // {
  //   path: 'tasks', // <domain>/tasks
  //   component: TasksComponent,
  // },
];

/*
  Routes are resolved from top to bottom, so in case of different routes, order won't matter,
  but for similar ones, it does matter.
*/
