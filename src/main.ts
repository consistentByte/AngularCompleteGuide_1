import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideRouter } from '@angular/router';
import { TasksComponent } from './app/tasks/tasks.component';
import { routes } from './app/app.routes';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);

// bootstrapApplication(AppComponent, {
//   providers: [provideRouter(routes)],
// }).catch((err) => console.error(err));

// bootstrapApplication(AppComponent, {
//   providers: [provideRouter([{ path: 'tasks', component: TasksComponent }])],
// }).catch((err) => console.error(err));

/*
To make routing work in this application, we need to enable this Angular feature. This process is straightforward. You need to go to your main.ts file and provide a configuration object as the second argument to the bootstrapApplication function.

In that second argument, you configure your providers by calling the provideRouter function, which must be imported from @angular/router. This function returns a router provider configured and created by Angular. This router provider must be passed as a provider to the providers array.

If you are using a module-based application where you are not calling bootstrapApplication but instead have a root app module, the process is essentially the same. You would call provideRouter and pass the provider it returns to the providers array of your route module, for example. 

route => url, and info about what is loaded when the url is active.

We can have many routes in application so its better to create a separate file for routes.

We can also outsource the config file.
*/
