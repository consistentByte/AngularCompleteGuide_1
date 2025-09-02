import { Component, computed, inject, signal } from '@angular/core';

import { TaskItemComponent } from './task-item/task-item.component';
import { TasksService } from '../tasks.service';

@Component({
  selector: 'app-tasks-list',
  standalone: true,
  templateUrl: './tasks-list.component.html',
  styleUrl: './tasks-list.component.css',
  imports: [TaskItemComponent],
})
export class TasksListComponent {
  private taskService = inject(TasksService);
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
