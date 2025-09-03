import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';
import { TasksServiceToken } from '../../../main';
import { TASK_STATUS_OPTIONS, taskStatusOptionsProvider } from '../task.model';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
  providers: [taskStatusOptionsProvider] // here we are injecting it to element injector, but we can also inject it by root injector.
  // providers: [{
  //   provide: TASK_STATUS_OPTIONS,
  //   useValue: TaskStatusOptions 
  // }]
})
//Since we want access in TaskList and TaskItem comp which is simply a child of TaskList, we can only provide the injectible value in TaskList.
//'use' properties of providers
//useValue since its a simple constant array that we want to provide which is just a value,
//useClass is used when we need a class that needs to be instantiated.
//useFactory to pass a function that needs to executed to generate some value, mostly use for complex values.

export class TasksListComponent {
  // injecting service via our injection token.
  private taskService = inject(TasksServiceToken);
  taskStatusOptions = inject(TASK_STATUS_OPTIONS);

  private selectedFilter = signal<string>('all');
  // tasks = this.taskService.allTasks;
  tasks = computed(() => {
    switch(this.selectedFilter()) {
      case 'open':
        return this.taskService.allTasks().filter(task => task.status === 'OPEN');
      case 'in-progress':
        return this.taskService.allTasks().filter(task => task.status === 'IN_PROGRESS');
      case 'done':
        return this.taskService.allTasks().filter(task => task.status === 'DONE');
      default:
        return this.taskService.allTasks();  
    }
  });
  onChangeTasksFilter(filter: string) {
    this.selectedFilter.set(filter);
  }
}

/*
  In service,
  tasks = signal<Task[]>([]);

  In comp,
  tasks =this.taskService.tasks();

  When using signal in comp from service like this, we get a writable signal, we can use this as well but there is an alternate way.]

  In service,
  private tasks = signal<Task[]>([]);
  allTasks = this.tasks.asReadonly();

  In comp,
  tasks = this.taskService.allTasks();
  Now in comp we get a read only signal, this is to make sure we don't accidently change the data from comp.

*/
