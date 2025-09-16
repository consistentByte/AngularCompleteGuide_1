import { Component, computed, inject, input } from '@angular/core';
import { UsersService } from '../users.service';

@Component({
  selector: 'app-user-tasks',
  standalone: true,
  templateUrl: './user-tasks.component.html',
  styleUrl: './user-tasks.component.css',
})
export class UserTasksComponent {
  userId = input.required<string>();

  private usersService = inject(UsersService);

  userName = computed(
    () => this.usersService.users.find((u) => u.id === this.userId())?.id
  );
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
  
    */
