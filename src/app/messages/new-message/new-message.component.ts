import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-message',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './new-message.component.html',
  styleUrl: './new-message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

/*
When OnPush is enabled in the new message component, typing into the message field triggers change detection on every keystroke due to two-way binding, which emits an event each time.

enabling OnPush on the new message component causes the counter component to be reevaluated on each keystroke. 
This happens because OnPush does not restrict events from affecting other components; 
it only prevents unnecessary evaluation of the component itself unless an event occurs within it or its inputs change.

Any change in new-message which is triggered on every key stroke due to two way binding, will make the entire component tree upto app component being checked for change detection.


So the only way to manage this is using OnPush where changedetection must be avoided and not in the place where the event occured.
so put OnPush on counter component.
*/

export class NewMessageComponent {
  add = output<string>();
  enteredText = signal('');

  get debugOutput() {
    console.log('[NewMessage] "debugOutput" binding re-evaluated.');
    return 'NewMessage Component Debug Output';
  }

  onSubmit() {
    this.add.emit(this.enteredText());
    this.enteredText.set('');
  }
}
