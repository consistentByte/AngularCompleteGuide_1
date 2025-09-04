import { ChangeDetectionStrategy, Component, inject, NgZone, OnInit, signal } from '@angular/core';

import { InfoMessageComponent } from '../info-message/info-message.component';

@Component({
  selector: 'app-counter',
  standalone: true,
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css',
  imports: [InfoMessageComponent],
  changeDetection: ChangeDetectionStrategy.OnPush
})

/*
  change detection happens now only if triggered manually, or if input changes, or in case of expired timers

  Now on typing in new message component, counter component is not trigeered so none of above conditions matches.

  If we do not use signals everything above will be true, but if we use signals even signal changes also lead to change detection being active for this component or child comp.
  
*/

export class CounterComponent implements OnInit {
  private zone = inject(NgZone);


  count = signal(0);
  // count = 0;

  ngOnInit(): void {
    // all bindings will run again, as zonejs sees expired timers as a change and angular runs change detection again.
      setTimeout(() => {
        this.count.set(0);
        // this.count = 0;
      },4000);
    
    // To opt out of zonejs watch mode, and skip angular change detection for some code.  
      this.zone.runOutsideAngular(()=> {
        //change detection will not run if this time out expires. this optimization can help us a few times. 
        setTimeout(()=> {
          console.log('Timer Expired');
        }, 5000);

      // This concept is also known as avoiding zone pollution because you are not polluting zone.js with events that do not matter in the end.
      })
  }

  get debugOutput() {
    console.log('[Counter] "debugOutput" binding re-evaluated.');
    return 'Counter Component Debug Output';
  }

  onDecrement() {
    this.count.update((prevCount) => prevCount - 1);
    // this.count -=1
  }

  onIncrement() {
    this.count.update((prevCount) => prevCount + 1);
    // this.count+=1;
  }
}
