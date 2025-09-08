import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { HttpHandler, HttpHandlerFn, HttpRequest, provideHttpClient, withInterceptors } from '@angular/common/http';

// unknown => can be any type of req with any type of body, generic shows type of request body.
function loggingInterceptor(request: HttpRequest<unknown>, next: HttpHandlerFn) {
    // We can use the request directly but we are cloning to produce a new one. And then doing a few changes
    // request.headers.set => fetching all headers then also setting a new one.
    // const req = request.clone({
    //     headers: request.headers.set('X-DEBUG', 'TESTING')
    // });
    console.log('[Outgoing Request]');
    console.log(request);
    // pass intercepted req to next function
    // return next(req);
    return next(request);
}

bootstrapApplication(AppComponent, {
    providers: [provideHttpClient(
        withInterceptors([
            // pass the interceptors in this array.
            loggingInterceptor,
        ])
    )]
}).catch((err) => console.error(err));


// provideHttpClient , now HttpClient is provided in entire application
// If not using modules, provide HttpClient service in main.ts, if using modules, then provide it in root module.
// If using modules, provideHttpClient() is passed to 'provider' parameter of @NgModule decorator of root module.

/*
interceptors, which are special functions that will be executed when a request is about to be sent or when a response arrives.
This means that besides the place where you triggered a request or where you subscribed to the request observable, you have another place where you can execute logic. 
That is the idea behind interceptors.

interceptor function is just another function and can be stored in any file.

To register such an interceptor, you should go to the place where you provide the HTTP client.
    pass withInterceptors function to it, in which we pass an array where we pass all the interceptor functions.

interceptor function accepts two arguments: the intercepted request object and a next function, which you would call to allow the intercepted request to continue.



Besides defining HTTP interceptors as functions (which is the modern, recommended way of doing it), you can also define HTTP interceptors via classes.

For example, the loggingInterceptor from the previous lecture could be defined like this (when using this class-based approach):

import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';
 
@Injectable()
class LoggingInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<unknown>, handler: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Request URL: ' + req.url);
    return handler.handle(req);
  }
}
An interceptor defined like this, must be provided in a different way than before though.

Instead of providing it like this:

providers: [
  provideHttpClient(
    withInterceptors([loggingInterceptor]),
  )
],
You now must use withInterceptorsFromDi() and set up a custom provider, like this:

providers: [
  provideHttpClient(
    withInterceptorsFromDi()
  ),
  { provide: HTTP_INTERCEPTORS, useClass: LoggingInterceptor, multi: true }
]
*/