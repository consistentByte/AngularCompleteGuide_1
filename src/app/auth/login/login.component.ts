import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

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
    }), // validators can be in Array or in a config object.
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
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
*/
