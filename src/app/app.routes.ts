import {
  CanMatchFn,
  RedirectCommand,
  Route,
  Router,
  Routes,
  UrlSegment,
} from '@angular/router';
import { NoTaskComponent } from './tasks/no-task/no-task.component';
import {
  resolveTitle,
  resolveUserName,
  UserTasksComponent,
} from './users/user-tasks/user-tasks.component';
import { NewTaskComponent } from './tasks/new-task/new-task.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { routes as userRoutes } from './users/user.routes';
import { inject } from '@angular/core';

const dummyCanMatch: CanMatchFn = (route: Route, segments: UrlSegment[]) => {
  // we can inject service if we want, or a observable to yield a boolean value, but ultimately return a boolean
  const router = inject(Router);
  const shouldGetAccess = Math.random();
  if (shouldGetAccess < 0.5) {
    return true;
  }
  // routeGuard allows to either return a boolean or a RedirectCommand().

  // return false; // returning false will deny access but also break the app as no route gets activated in that case. catchAll route gets active for it.
  // If we don't want to allow access we should redirect the user.
  return new RedirectCommand(router.parseUrl('/unauthorized')); // issue a redirect command to make angular redirect to a different page.
};

export const routes: Routes = [
  {
    path: '', // <domain>
    component: NoTaskComponent,
    // redirectTo: '/users/u1',
    // pathMatch: 'prefix' //<domain>/ =>  error as every path starts from '', so infinite redirect error, so use full instead
    title: 'No Task selected', // page title on tab
  },
  {
    path: 'users/:userId', // <domain>/users/<uid>, :___ => dynamic part
    component: UserTasksComponent,
    children: userRoutes,
    data: {
      message: 'Hello',
    },
    resolve: {
      // userName: resolveUserName, // Angular will execute this function for us whenever there is change in this route and this route is active, and we will be provided with resolved value.
    },
    title: resolveTitle,
    canMatch: [dummyCanMatch],
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

  The resolve property works similarly to data, but it is intended for dynamic data instead of static data. The resolve property expects an object with key-value pairs.
  previously we passed classes now functions.

  in title property of route for static page title we can set string values,
    but if we want to dynamically set page title, e.g. username as page title, we can also pass a resolver function resolving to a string value.

  Route guard: whether we can go to a particular route or not.
  canMatch guard & canActivate are similar but canActivate is executed after canMatch.
  canMatch is more modern approach.
  canMatch guard =>checks if it allows you to control whether this entire route should be matched by a certain navigation action or not. 
    In other words, whether some path entered into the URL should match this route.
  canActivateChild: if we allow this route to access but not its children

  canDeactivate: this route guard decides if a user is allowed to leave a page.

*/
