import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Project } from '../project.class';
import { PermissionsService } from 'src/app/permissions.service';
import { Observable, Subject } from 'rxjs';
import { UserSearchService } from 'src/app/user-search.service';
import { User } from 'src/app/user.class';

@Component({
  selector: 'app-project-users',
  templateUrl: './project-users.component.html',
  styleUrl: './project-users.component.css'
})
export class ProjectUsersComponent implements OnInit {

    @Input() project!: Project;
    @Input() project$!: Observable<Project>;
    @Input() authPermissionLevel!: number;
    @Output() closeForm = new EventEmitter();

    adminUserSearch: boolean = false;
    teamMemberUserSearch: boolean = false;
    spectatorUserSearch: boolean = false;

    constructor(private permissionService: PermissionsService) {}

    ngOnInit() {
        this.project$.subscribe(project => {
            this.project = project;
        });

        this.permissionService.addPermission$.subscribe(project => {
            this.project = project;
        });
    }

    toggleUserSearch(permissionLevel: number){
        switch(permissionLevel){
            case 3:
                this.adminUserSearch = !this.adminUserSearch;
                break;
            case 2:
                this.teamMemberUserSearch = !this.teamMemberUserSearch;
                break;
            case 1:
                this.spectatorUserSearch = !this.spectatorUserSearch;
                break;
        }
    }

    onAddUser(user: User, permissionLevel: number) {
        this.permissionService.addUserPermission(user.getId, this.project.getId, permissionLevel);
        this.toggleUserSearch(permissionLevel);
    }

    onCloseForm() {
        this.closeForm.emit();
    }

}
