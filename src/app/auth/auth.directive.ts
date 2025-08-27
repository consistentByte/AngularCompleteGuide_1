import { Directive, effect, inject, input } from '@angular/core';
import { type Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  userType = input.required<Permission>({alias: 'appAuth'})
  private authService = inject(AuthService);

  constructor() { 
    // performing an operation when userType signal value changes or activePermission value from service changes.
    effect(() => {
      if(this.authService.activePermission() === this.userType()) {
        console.log('SHOW ELEMENT');
      } else {
        console.log("DO NOT SHOW ELEMENT");
      }
    })
    //Since we are using effect, angular will set up subscription for activePermission and userType and if any of two signal value changes the callback function is executed.
  }

}
