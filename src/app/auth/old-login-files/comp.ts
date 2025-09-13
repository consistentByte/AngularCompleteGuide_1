import {
  afterNextRender,
  Component,
  DestroyRef,
  inject,
  viewChild,
} from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent_ {
  private form = viewChild.required<NgForm>('form');
  private destroyRef = inject(DestroyRef);

  // We use this function to register a function that should be executed once this component has been rendered for first time.
  constructor() {
    // Using afterNextRender since we are using template driven form, so after the template is initialized, we need to run the form.
    afterNextRender(() => {
      const savedForm = window.localStorage.getItem('saved-login-form');
      if (savedForm) {
        const loadedFormData = JSON.parse(savedForm);
        const savedEmail = loadedFormData.email;
        // this.form().setValue({
        //   email: savedEmail,
        //   password: '',
        // })
        // TO access only 1 field
        // this.form().controls['email'].setValue(savedEmail);
        //We get error on this, form is initialized but control objects are not fully initialized yet.
        //For template driven form, a workaround would be to use, setTimeout, as after a tick, form will be fully initialized along with controls.
        setTimeout(() => {
          this.form().controls['email'].setValue(savedEmail);
        }, 1);
      }

      // values changes on every keystroke
      // next runs on every new value emitted
      const subscription = this.form()
        .valueChanges?.pipe(debounceTime(500))
        .subscribe({
          next: (value) => {
            console.log(value);
            window.localStorage.setItem(
              'saved-login-form',
              JSON.stringify({ email: value.email })
            );
          },
        });

      this.destroyRef.onDestroy(() => subscription?.unsubscribe());
    });

    /*
      Here we are storing a value in localStorage on every key stroke, this is not ideal for perforance, 
      so adding debounceTime in pipe.
      debounceTime => takes a time value as parameter and if a value is emitted in that period it will discard that value.
      This will makes sure we don't write if user is still typing, only if user stops typing for 500 ms, emitted value will make it to next function.
    1. Start Timer:
    When the source observable emits a value, debouncetime starts a timer for the specified duration. 
    2. Reset Timer on New Emissions:
    If another value is emitted from the source observable before the timer runs out, the previous timer is discarded, and a new timer starts. 
    3. Emit Last Value:
    Only when the timer successfully completes without any new emissions will the last emitted value be passed through. 
    
    */

    /*
      Basically when the view is completely initialized and DOM is stable,
       means form is rendered, since afterNextRender is angular aware,
       it will run after the DOM is stable, 
       then it run only once since we add it in a constructor which is executed only once,
       but when it runs we add a listener to the observabe returned by form.valueChanges, to do something after value is changed.
    */
  }

  onSubmit(formData: NgForm) {
    // not passing validation checks wont stop us from submitting the form, instead angular does changes to the ngForm object stating validation check failed.
    if (formData.form.invalid) {
      // if validation checks fail angular sets status of ngForm as invalid, and also the invalid property to true
      return;
    }
    console.log(formData);
    const enteredEmail = formData.form.value.email;
    const enteredPassword = formData.form.value.password;
    console.log(formData.form);
    console.log(enteredEmail, enteredPassword);

    // resets the  fields and all internally managed information like, touched and valid etc.
    formData.form.reset();
  }
}

/*
afterNextRender() is used to run code after Angular has completed the current render cycle, meaning:

The DOM has been updated.

Any UI changes from reactive updates (like signals or inputs) have been flushed.

This is useful when you want to:

Measure layout (e.g., element dimensions).

Trigger animations after the DOM is fully updated.

Run logic that depends on the final rendered state.

afterNextRender() does not only run the first time a component is initialized — it runs every time you call it, and it waits until the next render cycle completes.

🔁 Reusability

You can call afterNextRender():

Inside ngAfterViewInit (on init).

Inside any lifecycle hook.

Inside an event handler (e.g., after a button click).

Inside a signal or effect.

Each time you call it, Angular will schedule your callback to run after the next DOM update, even if the component has already been initialized long ago.

@Component({
  selector: 'example',
  template: `
    <button (click)="update()">Update</button>
    <div #box>{{ count() }}</div>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class ExampleComponent {
  count = signal(0);
  @ViewChild('box') box!: ElementRef;

  update() {
    this.count.update(v => v + 1);

    afterNextRender().then(() => {
      console.log('DOM updated. New height:', this.box.nativeElement.offsetHeight);
    });
  }
}

Each time you click the button:

The signal (count) updates.

Angular re-renders the DOM.

afterNextRender() fires after the DOM is stable.

*/
