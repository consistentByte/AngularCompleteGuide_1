import { Component, DestroyRef, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { debounceTime, of } from 'rxjs';

// This code is loaded when file is loaded in browser, This client-side pre-rendering is possible since we use reactive forms.
let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');
if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm.email;
}

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value.includes('?')) {
    return null;
  }

  // its a common convention to have a descriptive property about error.
  return {
    doesNotContainQuestionMark: true,
  };
}

//Async validator.
function emailIsUnique(control: AbstractControl) {
  if (control.value !== 'test@example.com') {
    // return observable that emits null.
    // of produces an observable that instantly emits a value
    return of(null);
  }
  return of({
    notUnique: true,
  });
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule], // in template driven it was FormsModule
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  form = new FormGroup({
    email: new FormControl(initialEmailValue, {
      validators: [Validators.email, Validators.required],
      asyncValidators: [emailIsUnique],
    }), // validators can be in Array or in a config object.
    password: new FormControl('', {
      validators: [
        Validators.required,
        Validators.minLength(6), // factory function that produces a validator function thats why called.
        mustContainQuestionMark, //password must have a ?, we only pass pointer of it, and not simply call it.
      ],
    }),
  });

  ngOnInit() {
    /*
    const savedForm = window.localStorage.getItem('saved-login-form');
    if (savedForm) {
      const loadedForm = JSON.parse(savedForm);
      // patchValue: to partially update value of form, only the passed control will receive the new value and all other will remain untouched.
      this.form.patchValue({
        email: loadedForm.email,
      });
    }
*/
    // here we can use ngOnInit instead of afterNextRender, since we create our form in ts file, so we dont wait for the template to load.
    // no ? added as we are initializing form in code, so ts knows it will be initialized.
    const subs = this.form.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        window.localStorage.setItem(
          'saved-login-form',
          JSON.stringify({ email: value.email })
        );
      },
    });
    this.destroyRef.onDestroy(() => {
      subs.unsubscribe();
    });
  }

  get emailIsInvalid() {
    return (
      this.form.controls.email.touched &&
      this.form.controls.email.dirty &&
      this.form.controls.email.invalid
    );
  }

  get passwordIsInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.dirty &&
      this.form.controls.password.invalid
    );
  }

  onSubmit() {
    // this.form.controls.email.addAsyncValidators  to add validators dynamically.
    console.log(this.form);
    const enteredEmail = this.form.value.email;
    const enteredPassword = this.form.value.password;

    console.log(enteredEmail, enteredPassword);
  }
}
/*
  We get the same form group object as template driven form, because angular manages form in the same way, its just that the setup is different.
  We get better ts support in Reactive form, as our setup lies in ts file
  so it understands the code better.

  In reactive forms we dont add directives like required to controls in template instead we add validators in ts file.
  We can add validators where we initialize our form group and also dynamically.

  validator is just a function.
  In the function we automatically get the control, which returns null or undefined if the value is valid or return anything else, e.g. object with details about the error.

  email: new FormControl('', {
      validators: [Validators.email, Validators.required, (control) => {
        return null;
      }],

  async validators must return an observable,
  use cases: send an http req to backend to check if email was already registered.
  yield null if ok else an error object.


  Since using Reactive form we can load and populate our form in different way:
  we can load this component from local storage right when this file is about to be executed, so totally detached to our component lifecycle.
  => Outside of our component code.
*/
