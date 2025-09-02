import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent).catch((err) => console.error(err));

// We can bootstrap mutiple applications there, so  platform injector could provide a single instance of a service for multiple independent applications.