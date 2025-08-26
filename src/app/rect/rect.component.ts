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
  @Input({required: true}) size!: {width: string, height: string};
  @Output() sizeChange = new EventEmitter<{width: string, height: string}>();
  
  //Name convention is neccessary for angular to understand that we are using size for two-way binding, so it does all heavy lifting for us.
  onReset() {
    // ...
    this.sizeChange.emit({width: '200', height: '100'});
  }
}
