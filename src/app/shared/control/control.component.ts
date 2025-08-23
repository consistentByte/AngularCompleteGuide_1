import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'app-control',
  standalone: true,
  imports: [],
  templateUrl: './control.component.html',
  styleUrl: './control.component.css',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'control',
    '(click)': 'onhostClick()',
  },
})
export class ControlComponent {
  private el = inject(ElementRef); // injecting ElementRef in a component like this can let us access the host element.

  // Alternate to setting host property of Component decorator to set class to host element.
  // @HostBinding('class') className = 'control';
  // HostBinding not preffered now, its better to use host property instead.

  label = input.required<string>();

  onhostClick() {
    console.log('Host element clicked', this.el);
  }

  // @HostListener('click') onhostClickByHostListener() {
  //   console.log('Host element clicked HostListener');
  // }
}

//HostBinding => binding a property to host element with a value.
//HostListener => adding an event listener to host element.
