import { Routes } from '@angular/router';
import { TasksComponent } from './tasks/tasks.component';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import { UserTasksComponent } from './users/user-tasks/user-tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { routes as userRoutes } from './users/user.routes';
export const routes: Routes = [
  {
    path: '', // <domain>
    component: NoTaskComponent,
    // redirectTo: '/users/u1',
    // pathMatch: 'prefix' //<domain>/ =>  error as every path starts from '', so infinite redirect error, so use full instead
  },
  {
    path: 'users/:userId', // <domain>/users/<uid>, :___ => dynamic part
    component: UserTasksComponent,
    children: userRoutes,
    data: {
      message: 'Hello',
    },
  },
  {
    path: '**',
    component: NotFoundComponent, // fallback component
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

  catchAll or "**" route that is put at last in routes list, which becomes active if no other route matches the path.

  data property helps us define key value pairs.
  If input based approach for reading routes is enabled, data properties fill be provided via inputs.
*/
