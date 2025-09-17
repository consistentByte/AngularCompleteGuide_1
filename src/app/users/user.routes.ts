import { Routes } from '@angular/router';
import { TasksComponent } from '../tasks/tasks.component';
import { NewTaskComponent } from '../tasks/new-task/new-task.component';

export const routes: Routes = [
  {
    path: '', // <domain>/users/<uid>, adding default behavior that if no thing is added after parent path, redirect
    redirectTo: 'tasks',
    pathMatch: 'prefix', // when adding redirectTo property we must add this pathMatch key to (prefix or full) to tell angular how to parse the redirect path.
  }, // putting pathMatch as prefix won't matter here, as we are dealing with nested child route here.
  {
    path: 'tasks', // <domain>/users/<uid>/tasks
    component: TasksComponent,
  },
  {
    path: 'tasks/new',
    component: NewTaskComponent,
  },
  // {
  //   path: '**',
  //   component: NotFoundComponent, // fallback component
  // },
];
