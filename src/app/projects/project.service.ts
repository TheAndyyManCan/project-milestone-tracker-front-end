import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { Project } from './project.class';
import { AuthService } from '../auth.service';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {

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

    projectUpdated$ = new Subject<Project>();

    constructor(private router: Router, private auth: AuthService) { }

    createProject(userid: number, title: string, deadline: string|null, description: string|null) {
        this.ax.post('api/v1/projects', {
            user_id: userid,
            title: title,
            deadline: deadline,
            description: description
        }).then(response => {
            console.log(response);
            this.router.navigateByUrl('/projects');
        }).catch(err => {
            console.log(err);
        });
    }

    getProjectById(id: string){
        return this.ax.get('api/v1/projects/' + id);
    }

    returnProjectById(id: number){
        let project = new Project();

        this.ax.get('api/v1/projects/' + id).then((response) => {
            project.setProjectFromApi(response.data.data);
        }).catch(err => {
            console.log(err);
        });

        return project;
    }

    updateProject(project: Project){
        this.auth.checkUser();
        this.ax.patch('api/v1/projects/' + project.getId, {
            user_id: this.auth.user.getId,
            title: project.getTitle,
            deadline: project.getDeadline,
            description: project.getDescription
        }).then(response => {
            let newProject = new Project();
            newProject.setProjectFromApi(response.data.data);
            this.projectUpdated$.next(newProject);
        }).catch(err => {
            console.log(err);
        })
    }
}
