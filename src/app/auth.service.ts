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
    user = new User();
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
                let authorProjects = [];
                for(let project of response.data.data.projects.author){
                    let newProject = new Project();
                    newProject.setProjectFromApi(project);
                    authorProjects.push(newProject);
                }

                let adminProjects = [];
                for(let project of response.data.data.projects.admin){
                    let newProject = new Project();
                    newProject.setProjectFromApi(project);
                    adminProjects.push(newProject);
                }

                let teamMemberProjects = [];
                for(let project of response.data.data.projects.team_member){
                    let newProject = new Project();
                    newProject.setProjectFromApi(project);
                    teamMemberProjects.push(newProject);
                }

                let spectatorProjects = [];
                for(let project of response.data.data.projects.spectator){
                    let newProject = new Project();
                    newProject.setProjectFromApi(project);
                    spectatorProjects.push(newProject);
                }

                this.user = new User();
                this.user.setUserFromApi(response.data.data, authorProjects, adminProjects, teamMemberProjects, spectatorProjects);
                this.authenticated$.next(true);
                this.router.navigateByUrl("/projects");
            }).catch(err => {
                console.log(err);
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

    register(name: string, email: string, password: string, confirmPassword: string) {
        return this.ax.post('register', {
            name: name,
            email: email,
            password: password,
            password_confirmation: confirmPassword
        });
    }

    checkUser() {
        this.ax.get('api/user').then(response => {
            let authorProjects = [];
            for(let project of response.data.data.projects.author){
                let newProject = new Project();
                newProject.setProjectFromApi(project);
                authorProjects.push(newProject);
            }

            let adminProjects = [];
            for(let project of response.data.data.projects.admin){
                let newProject = new Project();
                newProject.setProjectFromApi(project);
                adminProjects.push(newProject);
            }

            let teamMemberProjects = [];
            for(let project of response.data.data.projects.team_member){
                let newProject = new Project();
                newProject.setProjectFromApi(project);
                teamMemberProjects.push(newProject);
            }

            let spectatorProjects = [];
            for(let project of response.data.data.projects.spectator){
                let newProject = new Project();
                newProject.setProjectFromApi(project);
                spectatorProjects.push(newProject);
            }

            this.user = new User();
            this.user.setUserFromApi(response.data.data, authorProjects, adminProjects, teamMemberProjects, spectatorProjects);
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
