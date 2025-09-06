import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import {interval, map, Observable} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);

  interval$ = interval(1000); // nothing will happen here, as we need to subscribe at least once, but here we don't have to subscribe, we have to convert the obs to a signal.
  // We create a new signal from an observable which gets updated if an observabe value is emitted.
  intervalSignal = toSignal(this.interval$, {
    initialValue: 0,
  });

  // interval = signal(0);
  // doubleInterval = computed(() => this.interval()*2);
  customInterval$ = new Observable((subscriber) => {
    let timesExecuted = 0;
    // here we define when we emit the next event.
    const interval = setInterval(() => {
      // subscriber.error() to pass error data if we want.

      if(timesExecuted > 3) {
        clearInterval(interval);
        subscriber.complete();
        // no future values emitted.
      }
      timesExecuted++;
      console.log('Emitting new value');
      subscriber.next({message: 'New value'});
    }, 2000);
  });
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

    // setInterval(() => {
    //   this.interval.update(prevIntervalNumber => prevIntervalNumber + 1);
    // })

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

    this.customInterval$.subscribe({
      next: (val) => console.log(val),
      complete: () => console.log("COMPLETED!")
    });

    const subscription = this.clickCount$.subscribe({
      // here we define the next function.
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

For conversion from signal to observable or vica versa, 
we have to convert that observable to a Signal or set up a listener in a place where you could also inject a value. You can do this either when setting up a property or in the constructor.

toObservable => we have converted the signal to an observable, or more precisely, created an extra observable based on that signal. 
We can still update the original signal, and a new value will be emitted in the observable created with the help of toObservable.

There was a lag in displaying intervalCount() in template that is because, observables have no initial value unlike signals.
So angular initializes signal from toSignal with undefined until a value is emitted.
Therefore, in the config object of toSignal function, we can set a initial value to the signal from toSignal until the value is emitteed by connected observable.

toSignal does one other nice thing for you: it will automatically clean up the observable subscription if the component where you are using that Signal gets removed. So when using toSignal on an observable, you do not need to clean up that subscription or that observable manually.
*/
