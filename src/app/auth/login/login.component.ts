import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule], // in template driven it was FormsModule
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''),
  });

  onSubmit() {
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

*/
