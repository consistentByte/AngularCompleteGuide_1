import { Component, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import {interval, map} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);

  private destroyRef = inject(DestroyRef);

  constructor() {
    //Whenever a function in the effect callback updates it reruns,
    effect(() => {
      console.log(`Clicked button ${this.clickCount()} times`);
    });
  }

  ngOnInit(): void {
    // pipe method allows us to add, rxjs operators to emitted values.
    //map operator, converts the value emitted by the observable.
    // we can add multiple operators in pipe.
    const subscription = interval(1000).pipe(
      map(val => val*2),
    ).subscribe({
      next: (val) => console.log(val),
      complete: () => console.log('completed'), //executes when completed, however this never gets completed.
      // error: () =>
    });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })

  }

  onClick() {
    //Emitting new values by ourselves like subject.
    this.clickCount.update(prevCount => prevCount+1);
  }
}

/*
Subjects are similar to observables but in subjects we also care about emitting those values manuallyP
With observables we have a data source which emits data automatically.
*/
