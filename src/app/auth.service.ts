import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.class';
import { Project } from './projects/project.class';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {

    authenticated$ = new BehaviorSubject<boolean>(false);
    user = new User(-1, "", "", []);
    user$ = new BehaviorSubject<User>(this.user);

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

    ngOnInit(){
        this.getAuthUser().then(() => {
            this.authenticated$.next(true);
        }).catch(() => {
            this.authenticated$.next(false);
        })
    }

    getCsrfToken() {
        return this.ax.get('sanctum/csrf-cookie');
    }

    login(email: string, password: string) {
        this.getCsrfToken().then(() => {
            this.ax.post('login', {
                email: email,
                password: password
            }).then(response => {
                let projects = [];
                for(let permission of response.data.data.permissions){
                    let newProject = new Project(
                        permission.project.id,
                        permission.project.title,
                        permission.project.author,
                        permission.project.deadline,
                        permission.project.description,
                        permission.project.time_left,
                        permission.project.milestones
                    );
                    projects.push(newProject);
                }
                this.user = new User(
                    response.data.data.id,
                    response.data.data.email,
                    response.data.data.name,
                    projects
                );
                this.authenticated$.next(true);
                this.router.navigateByUrl("/projects");
            }).catch(err => {
                console.log(err.response.data.message);
                this.logout();
            });
        }).catch(err => {
            console.log(err);
        })
    }

    logout(){
        this.ax.post('logout').then(() => {
            this.user.clearUser();
            this.authenticated$.next(false);
            this.router.navigateByUrl("/login");
        }).catch(() => {

        })
    }

    register(name: string, email: string, password: string) {
        return this.ax.post('register', {
            name: name,
            email: email,
            password: password
        });
    }

    checkUser() {
        this.ax.get('api/user').then(response => {
            let projects = [];
            for(let permission of response.data.data.permissions){
                let newProject = new Project(
                    permission.project.id,
                    permission.project.title,
                    permission.project.author,
                    permission.project.deadline,
                    permission.project.description,
                    permission.project.time_left,
                    permission.project.milestones
                );
                projects.push(newProject);
            }
            this.user = new User(
                response.data.data.id,
                response.data.data.email,
                response.data.data.name,
                projects
            );
            this.user$.next(this.user);
            this.authenticated$.next(true);
        }).catch(() => {
            this.user.clearUser();
            this.authenticated$.next(false);
        })
    }

    getAuthUser() {
        return this.ax.get('api/user');
    }
}
