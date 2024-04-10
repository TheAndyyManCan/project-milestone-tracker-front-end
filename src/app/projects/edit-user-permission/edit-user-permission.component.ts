import { Component, Input, OnInit } from '@angular/core';
import { Permission } from '../permission.class';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PermissionsService } from 'src/app/permissions.service';

@Component({
  selector: 'app-edit-user-permission',
  templateUrl: './edit-user-permission.component.html',
  styleUrl: './edit-user-permission.component.css'
})
export class EditUserPermissionComponent implements OnInit {

    @Input() permission!: Permission;

    editPermissionLevelForm!: FormGroup;

    constructor(private permissionService: PermissionsService) {}

    ngOnInit() {
        this.editPermissionLevelForm = new FormGroup({
            permissionLevel: new FormControl(this.permission.getPermissionLevel, Validators.required)
        });
    }

    onSubmit() {
        this.permissionService.updatePermission(this.permission.getId, this.editPermissionLevelForm.controls['permissionLevel'].value!);
    }
}
