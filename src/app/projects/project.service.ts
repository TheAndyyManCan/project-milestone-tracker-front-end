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
        this.ax.get('api/v1/projects/' + id).then((response: any) => {
            return new Project(
                response.data.data.id,
                response.data.data.title,
                response.data.data.author,
                response.data.data.deadline,
                response.data.data.description,
                response.data.data.time_left,
                response.data.data.milestones
            );
        }).catch(() => {
            return new Project(-1, '', -1, '', '', '', []);
        })
    }

    updateProject(project: Project){
        this.auth.checkUser();
        this.ax.patch('api/v1/projects/' + project.id, {
            user_id: this.auth.user.id,
            title: project.title,
            deadline: project.deadline,
            description: project.description
        }).then(response => {
            this.projectUpdated$.next(
                new Project(
                    response.data.data.project_id,
                    response.data.data.title,
                    response.data.data.author,
                    response.data.data.deadline,
                    response.data.data.description,
                    response.data.data.time_left,
                    response.data.data.milestones
                )
            );
        }).catch(err => {
            console.log(err);
        })
    }
}
