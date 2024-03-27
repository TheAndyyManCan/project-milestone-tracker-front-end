import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-input',
  templateUrl: './form-input.component.html',
  styleUrl: './form-input.component.css'
})
export class FormInputComponent {

    @Input() name!: string;
    @Input() type!: string;
    @Input() label!: string;
    @Input() formName!: string;
    @Input() form!: FormGroup;
}
