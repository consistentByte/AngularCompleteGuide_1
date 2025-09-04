import { Injectable, signal } from '@angular/core';
// import { BehaviorSubject } from 'rxjs';
//creates a wrapper around a value and lets us add subscriptions to listen to changes on that value
@Injectable({
  providedIn: 'root',
})
export class MessagesService {
  private messages = signal<string[]>([]);
  allMessages = this.messages.asReadonly();

  // messages$ = new BehaviorSubject<string[]>([]);

  // messages:string[] = [];
  // get allMessages() {
  //   return [...this.messages];
  // }
  addMessage(message: string) {
    this.messages.update((prevMessages) => [...prevMessages, message]);
      
    // this.messages = [...this.messages, message];
    // this.messages$.next([...this.messages]);
    // next => to emit new value.
  }
}