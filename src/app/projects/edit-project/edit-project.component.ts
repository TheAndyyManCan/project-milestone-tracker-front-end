import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '../project.class';
import { ProjectService } from '../project.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-project',
  templateUrl: './edit-project.component.html',
  styleUrl: './edit-project.component.css'
})
export class EditProjectComponent implements OnInit {

    @Input() project!: Project;
    @Output() closeForm = new EventEmitter<any>();

    public editProjectForm!: FormGroup;

    constructor(private projectService: ProjectService) {}

    onCloseForm(){
        this.closeForm.emit();
    }

    ngOnInit() {
        this.editProjectForm = new FormGroup({
            title: new FormControl(this.project.getTitle, Validators.required),
            description: new FormControl(this.project.getDescription, Validators.required),
            deadline: new FormControl(this.project.getDeadline, Validators.required)
        });
    }

    onSubmit(){
        this.project.updateProjectFromForm(
            this.editProjectForm.controls['title'].value,
            this.editProjectForm.controls['description'].value,
            this.editProjectForm.controls['deadline'].value
        );
        this.projectService.updateProject(this.project);
        this.closeForm.emit();
    }
}
