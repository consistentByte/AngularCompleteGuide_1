import {
  Component,
  computed,
  DestroyRef,
  inject,
  input,
  OnInit,
} from '@angular/core';
import { UsersService } from '../users.service';
import { ActivatedRoute, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent implements OnInit {
  userId = input.required<string>();
  userName = '';
  private usersService = inject(UsersService);
  private activateRoute = inject(ActivatedRoute);
  private destroyRef = inject(DestroyRef);

  // userName = computed(
  //   () => this.usersService.users.find((u) => u.id === this.userId())?.id
  // );

  ngOnInit() {
    // Console will load only once.
    console.log(this.activateRoute);
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
}
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
*/
