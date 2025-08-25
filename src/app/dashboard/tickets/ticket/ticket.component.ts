import { Component, input, output, signal } from '@angular/core';
import { type Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  // @Input({}) in decorator config object is passed directly in decorator.
  // ticket = input.required<Ticket>({alias: 'data'}); // if we didn't put required then we will have to put a default value then config object will be the second parameter.
  // ticket = input.required<Ticket>({transform: () => {}}); // takes in the input value and return the transform value.
  //Similarly we can pass config object to output() and @Output, we can pass alias as we did in input. 

  
  data = input.required<Ticket>();
  detailsVisible = signal(false);
  close = output();

  onToggleDetails() {
    // this.detailsVisible.set(!this.detailsVisible()); //here it won't setup a subscription and only read it once
    //Alternate way to set, update(), only diff is update expects a function and passes the current value of signal as a parameter to it.
    //update => Update the value of the signal based on its current value, and notify any dependents.
    this.detailsVisible.update((wasVisible) => !wasVisible)
  }

  onMarkAsCompleted() {
    this.close.emit();
  }
}
