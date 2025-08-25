import { Component, input, signal } from '@angular/core';
import { type Ticket } from '../ticket.model';

@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.css',
})
export class TicketComponent {
  data = input.required<Ticket>();
  detailsVisible = signal(false);

  onToggleDetails() {
    // this.detailsVisible.set(!this.detailsVisible()); //here it won't setup a subscription and only read it once
    //Alternate way to set, update(), only diff is update expects a function and passes the current value of signal as a parameter to it.
    //update => Update the value of the signal based on its current value, and notify any dependents.
    this.detailsVisible.update((wasVisible) => !wasVisible)
  }
}
