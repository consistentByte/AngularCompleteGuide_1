import { Component, inject, input, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { TasksService } from '../tasks.service';
import { CanDeactivateFn, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  userId = input.required<string>();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');
  private tasksService = inject(TasksService);
  private router = inject(Router); // for programmatic navigation

  onSubmit() {
    this.tasksService.addTask(
      {
        title: this.enteredTitle(),
        summary: this.enteredSummary(),
        date: this.enteredDate(),
      },
      this.userId()
    );
    //Progrmmatic navigation, array passed is same as router link
    this.router.navigate(['/users', this.userId(), 'tasks'], {
      replaceUrl: true,
    });
    // in config we can also set queryParams,
    // replaceUrl => works like a redirect and ensures user cant use back button to go back to this page where they're coming from.
  }
}

export const canLeaveEditPage: CanDeactivateFn<NewTaskComponent> = (
  component
) => {
  if (
    component.enteredTitle() ||
    component.enteredDate() ||
    component.enteredSummary()
  ) {
    return window.confirm(
      'Do you really want to leave? You will lose the entered data.'
    );
  }
  return true;
  // returns true always, but if user entered any values, then on leaving it will ask if user really wants to leave and returns true or false based on the dialog response.
};
// <NewTaskComponent> => Letting angular know to which component this will be tied.
