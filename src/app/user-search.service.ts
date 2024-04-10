import { Injectable } from '@angular/core';
import axios from 'axios';
import { User } from './user.class';

@Injectable({
  providedIn: 'root'
})
export class UserSearchService {

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

    constructor() { }

    userSearch(email: string, projectId: number): User[] {

        let users: User[] = [];

        this.ax.get('api/v1/projects/' + projectId + '/users/search/' + email).then(response => {
            if(response.data.data){
                for(let user of response.data.data){
                    let newUser: User = new User();
                    newUser.setUserFromProject(user);
                    users.push(newUser);
                }
            }
        }).catch(err => {
            console.log(err);
        });

        return users;
    }
}
