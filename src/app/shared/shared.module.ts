import { NgModule } from '@angular/core';
import { CardComponent } from './card/card.component';

@NgModule({
  declarations: [CardComponent],
  exports: [CardComponent], // Components that must not only be available inside shared module but also to all other modules that import the shared module
})
export class SharedModule {}
