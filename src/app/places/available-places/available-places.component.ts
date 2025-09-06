import { Component, inject, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent {
  places = signal<Place[] | undefined>(undefined);

  //HttpClient is a service provided by angular to send request and receive response
  //We get NullInjectorError if we try to inject HttpClient service like this, since we never set up a provider for this service
  private httpClient = inject(HttpClient);

  // constructor(private httpClient: HttpClient){}

}

// The HTTP client is not available in all Angular applications by default. To provide it, you could add it to the providers array in your component.