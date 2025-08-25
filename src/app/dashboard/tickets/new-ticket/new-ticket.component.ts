import { AfterViewInit, Component, ElementRef, OnInit, output, viewChild, ViewChild, ViewChildren } from '@angular/core';
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
export class NewTicketComponent implements OnInit, AfterViewInit{
  // @ViewChild(ButtonComponent) form!: HTMLFormElement; // if we put a class name as selector ViewChild will try to find an instance of buttoncomponent and will store that in form property
  @ViewChild('form') private form?: ElementRef<HTMLFormElement>;
  // private form = viewChild.required<ElementRef<HTMLFormElement>>('form');

  // to select multiple children use ViewChildren
  // @ViewChildren(ButtonComponent) buttonComponent?: ButtonComponent;
  
  add = output<{title: string, text: string}>();

  ngOnInit(): void {
    console.log('ON INIT');
    console.log(this.form?.nativeElement);
  }
  ngAfterViewInit(): void {
    // here we are guaranteed to have access viewChild elements since view is initialized
    console.log('AFTER VIEW INIT');
    console.log(this.form?.nativeElement);
  }

  onSubmit(title: string, ticketText: string) {
    this.add.emit({text: ticketText, title});
    // form.reset();
    this.form?.nativeElement.reset();
  }

}

// if we use signal viewChild function we may get access to viewChild elements in ngOnInit, 
// but if we are using @ViewChild decorator, we won't get access to viewChild elements in ngOnInit, therefore ngAfterViewInit becomes imp there.
// same thing happens for @ContentChild and contentChild signal function with respect to ngOnInit and ngAfterContentInit