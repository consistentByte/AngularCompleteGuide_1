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
  // submitted = signal(false);
  submitted = false;
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

    this.submitted = true;

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
  // on cancel or pressing back button we get a popup but on submitting thee form, we don't get a popup and we proceed
  if (component.submitted) {
    return true;
  }
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
