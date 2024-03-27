import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-form-textarea',
  templateUrl: './form-textarea.component.html',
  styleUrl: './form-textarea.component.css'
})
export class FormTextareaComponent {

    @Input() name!: string;
    @Input() label!: string;
    @Input() form!: string;
    @Input() value!: string|null;
}
