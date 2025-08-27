import { Directive, effect, inject, input, TemplateRef, ViewContainerRef } from '@angular/core';
import { type Permission } from './auth.model';
import { AuthService } from './auth.service';

@Directive({
  selector: '[appAuth]',
  standalone: true
})
export class AuthDirective {
  userType = input.required<Permission>({alias: 'appAuth'})
  private authService = inject(AuthService);
  private templateRef = inject(TemplateRef);
  private viewContainerRef = inject(ViewContainerRef);
  
  // Injecting a TemplateRef tells Angular that this directive will be used on an ng-template element and that we want to get hold of that template and implicitly also the content inside of that template. This content does not have to be a single element; it can be any markup of any structure and complexity.
  // The TemplateRef gives access to the content of the template, while the ViewContainerRef gives access to the place in the DOM where this directive is being used. You need both pieces of information to tell Angular where to render what.

  constructor() { 
    effect(() => {
      if(this.authService.activePermission() === this.userType()) {
        console.log('SHOW ELEMENT');
        this.viewContainerRef.createEmbeddedView(this.templateRef);
      } else {
        console.log("DO NOT SHOW ELEMENT");
        this.viewContainerRef.clear();
      }
    })
  }
    // I want to clear that rendered content and remove it. We can do that by calling the clear method on the ViewContainerRef. This will remove any embedded view that has been rendered.

    //Since we are using effect, angular will set up subscription for activePermission and userType and if any of two signal value changes the callback function is executed.
    // createEmbeddedView method tells Angular to render some new content into a certain place in the DOM.

        
  /*
    the content between the ng-template tags is not rendered onto the screen by default.
    that part of the template exists in our template but will not be on the rendered page initially.
    It will only show up once we call createEmbeddedView and pass the templateRef to it. 
  */
}
