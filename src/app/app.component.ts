import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {interval} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  private destroyRef = inject(DestroyRef);

  ngOnInit(): void {
    //after every 1000 milisecond a value will be produced
    //In order to listen or use values that are emitted, we need to subscribe
    //Also in order to kick off the observable we need to subscribe as internally rxjs thinks that if no one is listening, then it doesnt make sense to emit any.
    //object of subscribe method => next: when a value is emitted, complete: if observable is completed, error : run if error occured in observable.
    const subscription = interval(1000).subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('completed'), //executes when completed, however this never gets completed.
      // error: () =>
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })

  }
}
