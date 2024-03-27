import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { Project } from './project.class';

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

    constructor(private router: Router) { }

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
}
