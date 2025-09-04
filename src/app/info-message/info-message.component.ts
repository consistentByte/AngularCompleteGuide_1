import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-info-message',
  standalone: true,
  imports: [],
  templateUrl: './info-message.component.html',
  styleUrl: './info-message.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})

/*
  on any change in counter info-message component is triggered, since it is a child component of counter, therefore
  we can set changeDetectionStrategy as onpush for this, to prevent such unnecessary detection.
*/
export class InfoMessageComponent {
  get debugOutput() {
    console.log('[InfoMessages] "debugOutput" binding re-evaluated.');
    return 'InfoMessage Component Debug Output';
    // return Math.random(); // for ExpressionChangedAfterItHasBeenCheckedError
  }

  onLog() {
    console.log('Clicked!');
  }
}
