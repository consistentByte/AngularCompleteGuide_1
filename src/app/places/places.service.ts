import { inject, Injectable, signal } from '@angular/core';

import { Place } from './place.model';
import { HttpClient } from '@angular/common/http';
import { catchError, map, tap, throwError } from 'rxjs';
import { ErrorService } from '../shared/error.service';

@Injectable({
providedIn: 'root',
})
export class PlacesService {
  private httpClient = inject(HttpClient);
  private errorService = inject(ErrorService);
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
    const prevPlaces = this.userPlaces();

    if(!prevPlaces.some(p => p.id === place.id)) {
      // no place, then only update
      this.userPlaces.set([...prevPlaces, place]);
    }
    return this.httpClient.put('http://localhost:3000/user-places', {
      placeId: place.id
    }).pipe(catchError(err => throwError(() => {
      this.userPlaces.set(prevPlaces);
      this.errorService.showError('Failed to store selected place.');
      return new Error('Failed to store selected place.')
    })))
  }

  removeUserPlace(place: Place) {
    const prevPlaces = this.userPlaces();

    if(prevPlaces.some(p => p.id === place.id)) {
      this.userPlaces.set(prevPlaces.filter(p => p.id !== place.id));
    }
    return this.httpClient.delete('http://localhost:3000/user-places/'+place.id)
    .pipe(
      catchError(err => throwError(() => {
      this.userPlaces.set(prevPlaces);
      this.errorService.showError('Failed to remove the selected place.');
      return new Error('Failed to remove the selected place.')
    })
    ))
  }

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
