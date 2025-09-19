import { Routes } from '@angular/router';
import { NewTaskComponent } from '../tasks/new-task/new-task.component';
import { resolveUserTasks, TasksComponent } from '../tasks/tasks.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full',
  },
  {
    path: 'tasks', // <your-domain>/users/<uid>/tasks
    component: TasksComponent,
    runGuardsAndResolvers: 'paramsOrQueryParamsChange',
    resolve: {
      userTasks: resolveUserTasks,
    },
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
  },
];

/*
resolver functions are re-executed if a route parameter change but not if query param changes,
To solve this use runGuardsAndResolvers property.
runGuardsAndResolvers: 'always' resolver functions will always be executed whenever anything happens to route.
runGuardsAndResolvers: 'paramsOrQueryParamsChange' resolver functions will always be executed whenever our route params change or query param change.
*/
