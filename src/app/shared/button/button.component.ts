import { Component } from '@angular/core';

@Component({
  selector: 'button[appButton]', // css attribute selector, any button with attribute as button will be controlled by this component.
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
}) 
export class ButtonComponent {}
