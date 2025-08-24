import { Component, ElementRef, viewChild, ViewChild, ViewChildren } from '@angular/core';
import { ControlComponent } from '../../../shared/control/control.component';
import { ButtonComponent } from '../../../shared/button/button.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-new-ticket',
  standalone: true,
  imports: [FormsModule, ControlComponent, ButtonComponent],
  templateUrl: './new-ticket.component.html',
  styleUrl: './new-ticket.component.css',
})
export class NewTicketComponent {
  // @ViewChild(ButtonComponent) form!: HTMLFormElement; // if we put a class name as selector ViewChild will try to find an instance of buttoncomponent and will store that in form property
  // @ViewChild('form') private form?: ElementRef<HTMLFormElement>;
  private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  // to select multiple children use ViewChildren
  // @ViewChildren(ButtonComponent) buttonComponent?: ButtonComponent;

  onSubmit(title: string, ticketText: string) {
    console.dir(title);
    console.dir(ticketText);
    // form.reset();
    this.form().nativeElement.reset();
  }
}
