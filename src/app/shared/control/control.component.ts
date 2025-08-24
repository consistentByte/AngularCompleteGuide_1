import {
  afterNextRender,
  afterRender,
  Component,
  contentChild,
  ContentChild,
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

  // @ContentChild('input') private control?: ElementRef<HTMLInputElement | HTMLTextAreaElement>;  
  private control = contentChild.required<ElementRef<HTMLInputElement | HTMLTextAreaElement>>('input');
  
  label = input.required<string>();

  constructor() {
    afterRender(() => {
      // Whenever anything changes anywhere in entire application.
      console.log('After RENDER')
    });

    afterNextRender(() => {
      // afterNextRender is not executed repeatedly. It triggers only once after the next change anywhere in the entire Angular application.
      console.log('After NEXT RENDER');
    });
  }

  onhostClick() {
    console.log('Host element clicked', this.el);
    console.log(this.control());
  }

  // @HostListener('click') onhostClickByHostListener() {
  //   console.log('Host element clicked HostListener');
  // }
}

//HostBinding => binding a property to host element with a value.
//HostListener => adding an event listener to host element.
