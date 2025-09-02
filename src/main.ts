import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch((err) => console.error(err));


// bootstrapApplication(AppComponent, {
//     providers: [TasksService]
// }).catch((err) => console.error(err));

// This is how we inject a service to that application's root environment injector.
// This is same as writing @Injectible({providedIn: 'root'}) in that service.
// Declaring services to injector like this will make it include in the initial bundle of application created by angular as angular will thing its needed right from the start,
// even if its needed at a very later point of time. 
// But if we pass it to injector in the file using the @Injectible, So @Injectible is recommended as we may have a bit optimized initial bundle that way.

// We can bootstrap mutiple applications there, so  platform injector could provide a single instance of a service for multiple independent applications.