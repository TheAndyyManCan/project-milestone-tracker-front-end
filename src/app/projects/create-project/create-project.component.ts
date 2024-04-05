import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { ProjectService } from '../project.service';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrl: './create-project.component.css'
})
export class CreateProjectComponent implements OnInit {

    authenticated = false;

    public projectForm = new FormGroup({
        title: new FormControl("", Validators.required),
        deadline: new FormControl(""),
        description: new FormControl("")
    });

    constructor(private auth: AuthService, private projectService: ProjectService) {}

    ngOnInit(){
        this.auth.authenticated$.subscribe(auth => {
            this.authenticated = auth;
        });
        this.auth.checkUser();
    }

    onSubmit() {
        this.projectService.createProject(
            this.auth.user.getId,
            this.projectForm.controls.title.value!,
            this.projectForm.controls.deadline.value,
            this.projectForm.controls.description.value
        );
    }
}
