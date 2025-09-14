import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
})
export class SignupComponent {
  form = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required],
    }),
    passwords: new FormGroup({
      password: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
      confirmPassword: new FormControl('', {
        validators: [Validators.required, Validators.minLength(6)],
      }),
    }),
    firstName: new FormControl('', {
      validators: [Validators.required],
    }),
    lastName: new FormControl('', {
      validators: [Validators.required],
    }),
    address: new FormGroup({
      street: new FormControl('', {
        validators: [Validators.required],
      }),
      number: new FormControl('', {
        validators: [Validators.required],
      }),
      postalCode: new FormControl('', {
        validators: [Validators.required],
      }),
      city: new FormControl('', {
        validators: [Validators.required],
      }),
    }),
    role: new FormControl<
      'student' | 'teacher' | 'employee' | 'founder' | 'other'
    >('student', {
      validators: [Validators.required],
    }),
    agree: new FormControl(false, {
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    console.log(this.form);
  }

  onReset() {
    // button type reset will automatically reset the form input.
    // we can also use reset method of form for internally managed status, reset the form object. this way we dont have to make button type as reset.
    this.form.reset();
  }
}

/*
A dropdown is also a input, its just that user cannot add a value
Since form control is a generic type so we can pass which kind of values will it manage,
so in case of dropdown values, we can pass values, that we added our options for.


We can also add some structure to form groups here, and we can add some nesting here.
passwords formgroup for : password, and confirm password controls.

Then we also have to notify in template that these controls belong to a nested form group,
this is done, by passing a form group directive to a shared parent.'

  <div class="control-row" [formGroup]="form.controls.passwords">
  or
  <div class="control-row" formGroupName="passwords">
  formGroupName is a property provided by angular to specify nested form groups easily.
*/
