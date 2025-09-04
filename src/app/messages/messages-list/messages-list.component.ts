import { ChangeDetectionStrategy, ChangeDetectorRef, Component, DestroyRef, inject, input, OnInit } from '@angular/core';
import { MessagesService } from '../messages.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-messages-list',
  standalone: true,
  // imports: [AsyncPipe],
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
  // messages$ = this.messagesService.messages$;

  // private cdRef = inject(ChangeDetectorRef);
  // messages: string[] = [];
  messages = this.messagesService.allMessages;

  // ngOnInit() {
  //   //setting up subscription for change in messages  
  //   const subscription = this.messagesService.messages$.subscribe((messages) => {
  //     // running change detection manually if message list changes.
  //     this.messages = messages;
  //     this.cdRef.markForCheck();
  //   })
  //   // returns a Subscription value.

  //   this.destroyRef.onDestroy(()=> {
  //     subscription.unsubscribe();
  //   })
  // }

  //alternate way to this without using signals,
  // angular offers up a special pipe in the template to automatically set up and clean up subscription and read those values from the subject.
  // async pipe made to use with Observables.

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