import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';

export const routes: Routes = [
  {
    path: '', // <domain>
    component: NoTaskComponent,
  },
  {
    path: 'users/:userId', // <domain>/users/<uid>, :___ => dynamic part
    component: UserTasksComponent,
    children: [
      {
        path: 'tasks', // <domain>/users/<uid>/tasks
        component: TasksComponent,
      },
      {
        path: 'tasks/new',
        component: NewTaskComponent,
      },
    ],
  },
  // {
  //   path: 'tasks', // <domain>/tasks
  //   component: TasksComponent,
  // },
];

/*
  Routes are resolved from top to bottom, so in case of different routes, order won't matter,
  but for similar ones, it does matter.

  childRoutes help us to create nested routes, using children property.
  paths passed to children will automatically concatenated to parent path.

  the router-outlet in app.comp is for main routes.
  Child routes need a separate router-outlet in a component of which they are child of.
  So in above case a router-outlet must be added in UserTasksComponent.
*/
