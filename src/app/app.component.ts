import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import {interval, map} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  interval = signal(0);
  doubleInterval = computed(() => this.interval()*2);

  private destroyRef = inject(DestroyRef);

  constructor() {
    //Whenever a function in the effect callback updates it reruns,
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times`);
    // });

    //to convert a signal to observable.

    // toObservable(this.clickCount);
    
    // can also be used in places where we inject value.
  }

  ngOnInit(): void {

    setInterval(() => {
      this.interval.update(prevIntervalNumber => prevIntervalNumber + 1);
    })

    // pipe method allows us to add, rxjs operators to emitted values.
    //map operator, converts the value emitted by the observable.
    // we can add multiple operators in pipe.
    // const subscription = interval(1000).pipe(
    //   map(val => val*2),
    // ).subscribe({
    //   next: (val) => console.log(val),
    //   complete: () => console.log('completed'), //executes when completed, however this never gets completed.
    //   // error: () =>
    // });

    const subscription = this.clickCount$.subscribe({
      next: (val) => console.log(`Clicked button ${this.clickCount()} times`)
    })

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

Observables => Values over time,
Signals => values in a container.

Observable runs if atleast one listener, signals execute whether or not we listen/read its value.

Observables are great for managing events and streamed data.
Signals great for managing application state.

toObservable => we have converted the signal to an observable, or more precisely, created an extra observable based on that signal. 
We can still update the original signal, and a new value will be emitted in the observable created with the help of toObservable.
*/
