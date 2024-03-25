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
}
