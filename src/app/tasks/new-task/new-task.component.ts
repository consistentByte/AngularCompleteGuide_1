import { Component, EventEmitter, Output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-task',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-task.component.html',
  styleUrl: './new-task.component.css',
})
export class NewTaskComponent {
  @Output() cancel = new EventEmitter();
  enteredTitle = signal('');
  enteredSummary = signal('');
  enteredDate = signal('');

  //No need to chenage anything in template in ngModel, as angular notices that we are passing signal to ngModel and it handles it accordingly.
  onCancel() {
    this.cancel.emit();
  }
}
