import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');

  //HttpClient is a service provided by angular to send request and receive response
  //We get NullInjectorError if we try to inject HttpClient service like this, since we never set up a provider for this service
  private httpClient = inject(HttpClient);
  // constructor(private httpClient: HttpClient){}
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.isFetching.set(true);
    //Since get method returns an observable we need to subscribe it in order to receive the response when emitted,
    //We also need to subscribe as the observable is not triggered until there is atleast one listener attached.

    // pass the response type in <> of method for better ide support and check.
    
    //Unlike map which must return new data, catchError must return a new observable.
    //throwError is like interval which generates a value which is of type error.
    //Removing the complexity from subscribe method and using catchError for implementing separate logic to handle error, we don't need it as it can handle it via error method but it can help.
    
    const subscription = this.httpClient
    .get<{places: Place[]}>('http://localhost:3000/places')
    .pipe(
      map((resData) => resData.places),
      catchError((error) => {
        console.log(error);
        return throwError(()=> new Error('Something went wrong fetching the available places! Please try again later.'))
      })
    )
    .subscribe({
      next: (places) => {
        this.places.set(places);
      },
      complete: () => {
        //When angular completes the observable.
        this.isFetching.set(false);
      },
      error: (error: Error)=>{
        //when error is thrown
        this.error.set(error.message);
      }
    });
    // we can put is fetching to be false in next as well since this will only emit once but still its better to keep it in complete as we may sometime observe it differently.

    // Triggering next function with different data than actual response
    
    // setting value of observe to 'response' we will get entire HttpResponse and not just the response value.
    // Since there can be time when responseBody can be null.
    // const subscription = this.httpClient.get<{places: Place[]}>('http://localhost:3000/places', {
    //   observe: 'response'
    // }).subscribe({
    //   next: (res) => {
    //     console.log(res),
    //     console.log(res.body?.places);
    //   },
    // });

    // other than observing response, we can also observe events,
    // then next function will trigger multiple times since it will be triggered by various events in request-response lifecycle.
    // Service observes what we tell it to observes and returns emits the observation response in next.
    // this.httpClient.get('http://localhost:3000/places', {
    //   observe: 'events'
    // }).subscribe({
    //   next: (res) => {
    //     console.log(res)
    //   },
    // });


    //Since httpClient method returned observables typically only emit once that is the response so we dont need to unsubscribe but we should still do as its a good practice.
    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe();
    })
  }
}

// The HTTP client is not available in all Angular applications by default. To provide it, you could add it to the providers array in your component.