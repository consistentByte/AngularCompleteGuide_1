import { Component, ElementRef, Inject, viewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TasksService } from '../tasks.service';
import { TasksServiceToken } from '../../../main';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  private formEl = viewChild<ElementRef<HTMLFormElement>>('form');

  // to inject service via our own injection token, we need a new @Inject decorator and pass token in that.
  constructor(@Inject(TasksServiceToken) private taskService: TasksService){}

  // constructor(tService: TasksService) {
  //   this.taskService = tService;
  // }
  // adding private or public ahead of service and ts will create a property of that name and store the service. 
  // constructor(private taskService: TasksService) {}

  onAddTask(title: string, description: string) {
    this.taskService.addTask({title, description});
    this.formEl()?.nativeElement.reset();
  }
}
