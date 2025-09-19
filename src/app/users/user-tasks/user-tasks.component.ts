import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  ResolveFn,
  RouterLink,
  RouterOutlet,
  RouterStateSnapshot,
} from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  // userId = input.required<string>();
  // userName = '';
  message = input.required<string>();
  userName = input.required<string>();
  private activatedRoute = inject(ActivatedRoute);

  ngOnInit() {
    //data property geves us the static and dynamically resolved data. value is re-emitted whenever value changes.
    this.activatedRoute.data.subscribe({
      next: (data) => {
        console.log(data);
      },
    });
  }

  // private usersService = inject(UsersService);
  // private activateRoute = inject(ActivatedRoute);
  // private destroyRef = inject(DestroyRef);

  // userName = computed(
  //   () => this.usersService.users.find((u) => u.id === this.userId())?.id
  // );

  /*
  // not using ngOnInit, since data fetch is done using resolver.
  ngOnInit() {
    console.log('Input Data' + this.message());

    // Console will load only once.
    console.log(this.activateRoute);
    console.log(this.activateRoute.snapshot);
    console.log(this.activateRoute.snapshot.params); // this is not re-executed as the component changes as ngOnInit is not re-executed thats why we setup a subscription.
    // if a component doesnt need to be re-executed like our case then we can use direct values from snapshot but if the use case is similar we must rely on paramMap observable or input
    const subs = this.activateRoute.paramMap.subscribe({
      next: (paramMap) => {
        console.log(paramMap);
        // paramMap has a get Method that allows us to extract keyValue pairs.
        this.userName =
          this.usersService.users.find((u) => u.id === paramMap.get('userId'))
            ?.name || '';

        //This code will be triggerd when we click on different users, but not the code outside of this subscription in ngOnInit
        // Proving the point that ngOnInit runs once then component is reused.
      },
    });

    this.destroyRef.onDestroy(() => {
      subs.unsubscribe();
    });
  }
*/
}

/*
  naming like this since we are creating a resolver function to get userName.
  To be accepted in resolve array it must have a specific function definition, adding type to a function, ResolveFn
  we cant subscribe to snapshot, but the resolver is called every time this route gets active, and it will then recieve the latest snapshot, therefore no reason for subscribing to activated route here.
  even if the route param change the resolver will be called.

  resolve function must return the data that it has to resolve, e.g. username
  
  resolve function is outside of class so no access to this.
  But we can use inject function in order to inject a service in that function.
  constructor cant be used since functions do not have a constructor.

  ResolveFn<string> , function definition of type RouterFn returning a string.

  If the input approach for route fetch is enabled,
    resolved data will be recieved via input.
*/

export const resolveUserName: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  //imitating getting value via http.
  const usersService = inject(UsersService);
  const userName =
    usersService.users.find(
      (u) => u.id === activatedRoute.paramMap.get('userId')
    )?.name || '';
  return userName;
};

export const resolveTitle: ResolveFn<string> = (
  activatedRoute: ActivatedRouteSnapshot,
  routerState: RouterStateSnapshot
) => {
  return resolveUserName(activatedRoute, routerState) + "'s Tasks";
};

/*
  Different ways of getting hold of a path parameter value:
  1] Extracting Route params via Inputs: 
    property name with same name as path param in routes, passed here to input.
      passing string as generic since url is a string.
      For this approach to work, you need to configure your Angular application router accordingly. 
      In our application configuration, we must tell the Angular router that we want to use this input-based approach.
      We do this by calling provideRouter and passing a second argument which is the result of calling withComponentInputBinding().

      This function creates a configuration object that enables input binding for route parameters when passed as an argument to provideRouter
      (not as the first argument, which must be the routes array).
  
  2] ActivatedRoute, extracting dynamic route params via Observables:
    activateRoute holds info about the route that is activated by angular.
    inject ActivatedRoute service,
      has a property paramMap which returns an Observable Subject to which we can subscribe,
        to which the dynamic route params will be passed in keyValue pairs.

    Why it needed to be a subscription for reading dynamic route?
      This component will be re-used, therefore ngOnInit will not be executed again, hence a subscription is needed to be notified about changes.
      since the only thing that will change is the userId in the url, so we're now notified when that happens.

    We can also use snapshot property of ActivatedRoute which provides us with same values not as observables or subjects but as actual values.
*/
