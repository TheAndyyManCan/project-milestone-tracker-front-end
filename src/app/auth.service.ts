import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios, { Axios } from 'axios';
import { BehaviorSubject, Subject } from 'rxjs';
import { User } from './user.class';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {

    authenticated$ = new BehaviorSubject<boolean>(false);
    user = new User(-1, "", "", []);

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
        this.getAuthUser().then(response => {
            this.authenticated$.next(true);
        }).catch(err => {
            this.authenticated$.next(false);
        })
    }

    getCsrfToken() {
        return this.ax.get('sanctum/csrf-cookie');
    }

    login(email: string, password: string) {
        this.getCsrfToken().then(response => {
            this.ax.post('login', {
                email: email,
                password: password
            }).then(response => {
                this.user = new User(
                    response.data.id,
                    response.data.email,
                    response.data.name,
                    response.data.projects
                );
                this.authenticated$.next(true);
                this.router.navigateByUrl("/");
            }).catch(error => {
                this.logout();
            });
        })
    }

    logout(){
        this.ax.post('logout').then(response => {
            this.user.clearUser();
            this.authenticated$.next(false);
            this.router.navigateByUrl("/login");
        }).catch(err => {

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
            this.user = new User(
                response.data.data.id,
                response.data.data.email,
                response.data.data.name,
                response.data.data.projects
            );
            this.authenticated$.next(true);
        }).catch(err => {
            this.user.clearUser();
            this.authenticated$.next(false);
        })
    }

    getAuthUser() {
        return this.ax.get('api/user');
    }
}
