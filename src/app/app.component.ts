import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {interval, map} from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {

  private destroyRef = inject(DestroyRef);

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
}
