import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import axios from 'axios';

@Injectable({
  providedIn: 'root'
})
export class HttpTokenService {

  constructor(private http: HttpClient) { }

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
}
