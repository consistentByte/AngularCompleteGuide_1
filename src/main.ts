import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { provideExperimentalZonelessChangeDetection } from '@angular/core';

bootstrapApplication(AppComponent, {
    providers: [provideExperimentalZonelessChangeDetection()]
}).catch((err) => console.error(err));

// Inlcluding special provider for going zoneless, provideExperimentalZonelessChangeDetection
// now zonejs wont tell angular if something changes, only signals will tell.