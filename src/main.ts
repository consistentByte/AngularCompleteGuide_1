import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';


bootstrapApplication(AppComponent, {
    providers: [provideHttpClient()]
}).catch((err) => console.error(err));


// provideHttpClient , now HttpClient is provided in entire application
// If not using modules, provide HttpClient service in main.ts, if using modules, then provide it in root module.
// If using modules, provideHttpClient() is passed to 'provider' parameter of @NgModule decorator of root module.