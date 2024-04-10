import { Injectable } from '@angular/core';
import axios from 'axios';
import { Subject } from 'rxjs';
import { Project } from './projects/project.class';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

    ax = axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'true'
        },
        withCredentials: true,
        withXSRFToken: true
    });

    addPermission$ = new Subject<Project>();

    constructor() { }

    addUserPermission(userId: number, projectId: number, permissionLevel: number){
        this.ax.post('api/v1/permissions', {
            project_id: projectId,
            user_id: userId,
            permission_level: permissionLevel
        }).then(response => {
            let project = new Project();
            project.setProjectFromApi(response.data.data);
            this.addPermission$.next(project);
        }).catch(err => {
            console.log(err);
        });
    }

    updatePermission(permissionId: number, permissionLevel: number) {
        this.ax.patch('api/v1/permissions/' + permissionId + '/level', {
            permission_level: permissionLevel
        }).then(response => {
            let project = new Project();
            project.setProjectFromApi(response.data.data);
            this.addPermission$.next(project);
        }).catch(err => {
            console.log(err);
        })
    }

    deletePermission(permissionId: number) {
        this.ax.delete('api/v1/permissions/' + permissionId).then(response => {
            let project = new Project();
            project.setProjectFromApi(response.data.data);
            this.addPermission$.next(project);
        }).catch(err => {
            console.log(err);
        });
    }
}

