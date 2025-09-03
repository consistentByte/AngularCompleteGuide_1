import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { TasksService } from './app/tasks/tasks.service';
import { InjectionToken } from '@angular/core';


//Tokens can be exported to a separate file.
export const TasksServiceToken = new InjectionToken<TasksService>('tasks-service-token'); // pass which type of value this token will provide to remove type check errors.
bootstrapApplication(AppComponent, {
    providers: [{provide: TasksServiceToken, useClass: TasksService}]
}).catch((err) => console.error(err));


/*
this code is a shortcut :
    bootstrapApplication(AppComponent, {
        providers: [TasksService]
    }).catch((err) => console.error(err));

for this (By creating our own token): 
    const TasksServiceToken = new InjectionToken('tasks-service-token');
        bootstrapApplication(AppComponent, {
            providers: [{provide: TasksServiceToken, useClass: TasksService}]
        }).catch((err) => console.error(err));

    

provide : registers a injection token for the injectible service.
    The idea behind injection token is that it acts as identifier for the injectible service.
    By Default using the shortcut, providers: [TasksService]
    the injection token is the name of service 'TaskService'.
    Therefore whereever we need it, we get it by passing the identier to inject or onstructor at target place.
    inject(TaskService), angular injects the service corresponding to identifier token.


*/

// bootstrapApplication(AppComponent, {
//     providers: [TasksService]
// }).catch((err) => console.error(err));

// This is how we inject a service to that application's root environment injector.
// This is same as writing @Injectible({providedIn: 'root'}) in that service.
// Declaring services to injector like this will make it include in the initial bundle of application created by angular as angular will thing its needed right from the start,
// even if its needed at a very later point of time. 
// But if we pass it to injector in the file using the @Injectible, So @Injectible is recommended as we may have a bit optimized initial bundle that way.

// We can bootstrap mutiple applications there, so  platform injector could provide a single instance of a service for multiple independent applications.