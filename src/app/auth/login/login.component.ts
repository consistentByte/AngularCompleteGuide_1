import { Component } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { of } from 'rxjs';

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
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', {
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


*/
