import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { MessagesListComponent } from './messages-list/messages-list.component';
import { NewMessageComponent } from './new-message/new-message.component';

@Component({
  selector: 'app-messages',
  standalone: true,
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
  imports: [MessagesListComponent, NewMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush, // two modes, default and OnPush
})

/*
change detection is checking for changes if any by angular on events or expired timers.

The OnPush change detection strategy in Angular instructs the framework that the component for which it is enabled will only update when certain specific events occur. These events include an event happening inside the component's subtree or when an input property changes.

Specifically, change detection runs when:

An event occurs inside the component or any of its nested child components.
An input value of the component changes.
Change detection is manually triggered.

For example, in the messages component, if there are no input properties, change detection will not run due to input changes, but it will run if an event occurs inside the component or its children.

This strategy limits the number of events that trigger change detection, making OnPush a powerful performance optimization. It is especially beneficial in applications where not all components need to be checked on every change.

However, in very simple or highly interconnected applications(changes affecting while app) where most changes affect all components, OnPush may not provide significant benefits.


If we do not use signals everything above will be true, but if we use signals even signal changes also lead to change detection being active for this component or child comp.
In many cases, it might not matter too much because Signals often change due to events which are being watched anyway.
since events in this component or child components will trigger OnPush components to be checked again.

*/

export class MessagesComponent {
  messages = signal<string[]>([]);

  get debugOutput() {
    console.log('[Messages] "debugOutput" binding re-evaluated.');
    return 'Messages Component Debug Output';
  }

  onAddMessage(message: string) {
    this.messages.update((oldMessages) => [...oldMessages, message]);
  }
}
