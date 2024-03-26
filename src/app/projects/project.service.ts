import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';

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
}
