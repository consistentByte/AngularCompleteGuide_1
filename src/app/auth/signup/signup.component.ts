import { Component } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

function equalValuesOld(control: AbstractControl) {
  // const password = control.controls.password
  // if no password control found then null else value
  const password = control.get('password')?.value;
  const confirmPassword = control.get('confirmPassword')?.value;

  if (password === confirmPassword) {
    return null;
  }
  return {
    passwordsNotEqual: true,
  };
}

//Create a factory function that is a generic function that produces validator function based on input.
// make this function return a function, where the returned function will receive the abstract control and execute the code
function equalValues(control1: string, control2: string) {
  return (control: AbstractControl) => {
    const val1 = control.get(control1)?.value;
    const val2 = control.get(control2)?.value;

    if (val1 === val2) {
      return null;
    }
    return {
      valuesNotEqual: true,
    };
  };
}
// Now we can use this factory function to compare any two form controls

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
    passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      {
        // validators: [equalValuesOld],
        validators: [equalValues('password', 'confirmPassword')],
      }
    ),
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
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),
    agree: new FormControl(false, {
      validators: [Validators.required],
    }),
  });

  onSubmit() {
    console.log(this.form);
    if (this.form.invalid) {
      console.log('INVALID FORM!');
    }
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

  How did you find us is a list of values that can be checked or unchecked.

Another kind of formGroup =>FormArray
    source: new FormArray([
      new FormControl(false),
      new FormControl(false),
      new FormControl(false),
    ]),

    we do not add name to these controls, and in future if we have to add more simply add more, its easy.
  connecting formArray to template:
    <fieldset formArrayName="source">
  connecting controls in formArray to template:
    incrementing numbers from 0 to formControlName.
    e.g. formControlName="0"

  in form formGroup now, source is an array : [false, false, false]

  FormGroup is also a form control, its just that its a special kind of form control that consists of multiple controls so,
  formGroups also have a second parameter where we pass a config object to add formGroup validators, async validators etc.

  we should have access password, via control.controls.password, as ts doesnt know what that abstract control will be,
  It doesnt know that the control is a formGroup with nested controls for password and confirmPassword.
  We know that but ts doens't allow.
  But all the control objects have a 'get' method, in which we pass the name of control and it will search for that control. 

   passwords: new FormGroup(
      {
        password: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
        confirmPassword: new FormControl('', {
          validators: [Validators.required, Validators.minLength(6)],
        }),
      },
      {
        validators: [equalValues],
      }
    ),
  No error to be seen as the angular did added the validation classes like ng-pristine, ng-touched and ng-dirty on validation failure but they are added to the div or the parent element not the actual controls.
  on which the nested form group passwords was added.

  We can make our equalValues validator generic, as it for now only look for a password and a confirm password

  Factory function is one that produces a validator function based on the input.
*/
