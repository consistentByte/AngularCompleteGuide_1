import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
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
  }
}
