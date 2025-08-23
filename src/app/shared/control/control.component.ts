import {
  Component,
  HostBinding,
  HostListener,
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
  // Alternate to setting host property of Component decorator to set class to host element.
  // @HostBinding('class') className = 'control';
  // HostBinding not preffered now, its better to use host property instead.

  label = input.required<string>();

  onhostClick() {
    console.log('Host element clicked');
  }

  // @HostListener('click') onhostClickByHostListener() {
  //   console.log('Host element clicked HostListener');
  // }
}

//HostBinding => binding a property to host element with a value.
//HostListener => adding an event listener to host element.
