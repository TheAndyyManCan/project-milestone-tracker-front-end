import { Component, Input } from '@angular/core';
import { Permission } from '../permission.class';
import { PermissionsService } from 'src/app/permissions.service';

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrl: './user-permission.component.css'
})
export class UserPermissionComponent {

    @Input() permission!: Permission;
    @Input() authPermissionLevel!: number;

    editMode: boolean = false;

    constructor(private permissionService: PermissionsService) {}

    toggleEditMode() {
        this.editMode = !this.editMode;
    }

}
