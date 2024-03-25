import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent {

    inputs = [
        {name: 'title', type: 'text', label: 'Title', formControl: 'title'},
        {name: 'deadline', type: 'date', label: 'Deadline', formControl: 'date'}
    ];

    public projectForm = new FormGroup({
        title: new FormControl("", Validators.required),
        date: new FormControl(""),
        description: new FormControl("")
    });

    onSubmit() {

    }
}
