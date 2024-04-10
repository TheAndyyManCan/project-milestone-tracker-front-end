import { Component, Input, OnInit } from '@angular/core';
import { Permission } from '../permission.class';
import { PermissionsService } from 'src/app/permissions.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-permission',
  templateUrl: './user-permission.component.html',
  styleUrl: './user-permission.component.css'
})
export class UserPermissionComponent implements OnInit {

    @Input() permission!: Permission;
    @Input() authPermissionLevel!: number;

    public editPermissionLevelForm!: FormGroup;

    editMode: boolean = false;

    constructor(private permissionService: PermissionsService) {}

    ngOnInit() {
        this.editPermissionLevelForm = new FormGroup({
            permissionLevel: new FormControl(this.permission.getPermissionLevel, Validators.required)
        });
    }

    toggleEditMode() {
        this.editMode = !this.editMode;
    }

    deleteUser() {
        this.permissionService.deletePermission(this.permission.getId);
    }

}
