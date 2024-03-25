import { Injectable, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import axios, { Axios } from 'axios';
import { Subject } from 'rxjs';
import { User } from './user.class';

@Injectable({
    providedIn: 'root'
})
export class AuthService implements OnInit {

    authenticated$ = new Subject<Boolean>();
    user = new User(-1, "", "", []);

    constructor(private router: Router) { }

    ngOnInit(){
        this.getAuthUser();
        if(this.user.id < 0){
            this.authenticated$.next(false);
        } else {
            this.authenticated$.next(true);
        }
    }

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

    getAuthUser() {
        this.ax.get('api/user').then(response => {
            console.log(response);
        }).catch(err => {
            console.log(err);
        })
    }
}
