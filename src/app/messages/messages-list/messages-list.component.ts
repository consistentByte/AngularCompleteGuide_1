import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { MessagesService } from '../messages.service';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  templateUrl: './messages-list.component.html',
  styleUrl: './messages-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})

/*
  Since this component only needs to be triggered if its input value change and not otherwise,
  so we can use changeDetection as OnPush. to prevent unnecessary detection of this component otherwise.
*/
export class MessagesListComponent {
  // messages = input.required<string[]>();

  private messagesService = inject(MessagesService);
  get messages() {
    return this.messagesService.allMessages;
  }

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}

/* 
  after converting the app frfom using normal variables and getter instead of signals passed communicating via services along with OnPush,
  On adding a new message, message list is not visible and logs not visible of message-list,

  the message is not showing up down here.

Indeed, if you take a look at the log messages, you will not see a log message for this messages list component. It is not part of that log because change detection was not triggered for that component.

And why was that the case? Well, because the messages list component is an OnPush component, and therefore, as I explained, change detection for this component runs if an input changes. Here, I have no inputs.

If we trigger it manually, that is not happening here. If we have an event in this component or a child component, that is also not the case here.
 Or if a Signal changes here in this component, that is also not the case. And that is why this component is never checked for changes and why the new message does not show up here.
*/