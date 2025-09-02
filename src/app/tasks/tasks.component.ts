import { Component } from '@angular/core';

import { NewTaskComponent } from './new-task/new-task.component';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { TasksService } from './tasks.service';

@Component({
  selector: 'app-tasks',
  standalone: true,
  templateUrl: './tasks.component.html',
  imports: [NewTaskComponent, TasksListComponent],
  // providers: [TasksService] // Injecting service using element injector.
})

/*
The purpose of the providers array is to set up injectable values that are tied to the element injector belonging to this component. 
All child components, meaning all components and elements used in the template of the tasks component, will also have access to that element injector.
However, other components, such as the app component, will not have access to it. This effectively restricts the service to that part of your component tree

If we also Pass TaskService to Tasklist component then angular will provide a different instance of tasksservice to that component and its children.
*/
export class TasksComponent {}
