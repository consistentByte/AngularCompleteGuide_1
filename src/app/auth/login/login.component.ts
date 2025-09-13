import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // A form in angular is a formgroup object.
  // we have to pass an object having key: value pair and every key value pair represents one control inside of that form group or nested form group.

  //First step : Setting up form in ts file for reactive form. 
  form = new FormGroup({
    email: new FormControl(''),
    password: new FormControl(''), // can be passed with or without an initial value
  });
  //Second step, let angular know how our form is connected to our actual input element in html.
  

  // This is how a form is created using reactive form approach.

  onSubmit() {
    // this.form.value.email  to get the value.
  }
}
