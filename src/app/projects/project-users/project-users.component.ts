import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '../project.class';
import { PermissionsService } from 'src/app/permissions.service';
import { Observable, Subject } from 'rxjs';

@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrl: './project-users.component.css'
})
export class ProjectUsersComponent implements OnInit {

    @Input() project!: Project;
    @Input() project$!: Observable<Project>;
    @Output() closeForm = new EventEmitter();

    constructor(private permissionService: PermissionsService) {}

    ngOnInit() {
        this.project$.subscribe(project => {
            this.project = project;
        });
    }

    onCloseForm() {
        this.closeForm.emit();
    }

}
