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
  messages = this.messagesService.allMessages;

  get debugOutput() {
    console.log('[MessagesList] "debugOutput" binding re-evaluated.');
    return 'MessagesList Component Debug Output';
  }
}
