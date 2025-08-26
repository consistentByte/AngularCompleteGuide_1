import { Component, EventEmitter, Input, model, Output } from '@angular/core';

@Component({
  selector: 'app-rect',
  standalone: true,
  imports: [],
  templateUrl: './rect.component.html',
  styleUrl: './rect.component.css',
})
export class RectComponent {
  // Todo: Implement custom two-way binding
  
  //We can implement custom two-way binding using Input and Output decorators or their signal functions.
  // @Input({required: true}) size!: {width: string, height: string};
  // @Output() sizeChange = new EventEmitter<{width: string, height: string}>();
  
  //Name convention is neccessary for angular to understand that we are using size for two-way binding, so it does all heavy lifting for us.
  
  // Alternate way for two-way binding => model() function => from angular 17
  // When using model function no need for seaprate Input and Output.

  size = model.required<{width: string, height: string}>();

  onReset() {
    // ...
    //Instead of emitting something we simply update the signal like we always update a signal.
    //And the component where we provide its value will be notified.
    
    // this.size.emit({width: '200', height: '100'});

    this.size.set({width: '200', height: '100'});
  }
}
