import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { Project } from '../project.class';
import { User } from 'src/app/user.class';
import { Permission } from '../permission.class';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-user-permission-column',
  templateUrl: './user-permission-column.component.html',
  styleUrl: './user-permission-column.component.css'
})
export class UserPermissionColumnComponent {

    @Input() project!: Project;
    @Input() permissions!: Permission[];
    @Input() project$!: Observable<Project>;
    @Input() authPermissionLevel!: number;
    @Input() title!: string;

    @Output() addUser = new EventEmitter<User>();

    userSearch: boolean = false;

    constructor() {}

    toggleUserSearch() {
        this.userSearch = !this.userSearch;
    }

    onAddUser(user: User) {

    }
}
