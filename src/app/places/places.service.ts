import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';

@Injectable({
providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private userPlaces = signal<Place[]>([]);

  loadedUserPlaces = this.userPlaces.asReadonly();

  loadAvailablePlaces() {
  // this function is a Wrapper and config around fetchPlaces
    return this.fetchPlaces('http://localhost:3000/places', 'Something went wrong fetching the available places! Please try again later.');
  }

  loadUserPlaces() {
    // tap is like doing something in subscribe without subscribe.
    // using tap operator to update a signal without subscribing.
    return this.fetchPlaces('http://localhost:3000/user-places', 'Something went wrong fetching your favorite places! Please try again later.')
    .pipe(tap({
      next: (userPlaces) => this.userPlaces.set(userPlaces)
    }))
  }

  addPlaceToUserPlaces(place: Place) {
    this.userPlaces.update(prevPlaces => [...prevPlaces, place]);

    return this.httpClient.put('http://localhost:3000/user-places', {
      placeId: place.id
    });
  }

  removeUserPlace(place: Place) {}

  private fetchPlaces(url: string, errorMessage: string) {
    return this.httpClient
      .get<{places: Place[]}>(url)
      .pipe(
        map((resData) => resData.places),
        catchError((error) => {
          console.log(error);
          return throwError(()=> new Error(errorMessage))
        })
      );  
  }
}
