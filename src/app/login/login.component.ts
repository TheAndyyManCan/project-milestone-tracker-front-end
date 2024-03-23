import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  email: string = "";
  password: string = "";

  public loginForm = new FormGroup({
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  constructor(private http: HttpClient, private router: Router){}

  onSubmit(){

    console.log(this.loginForm.value);
    this.http.post('http://localhost:8000/api/v1/users/login', this.loginForm.value).subscribe(
      response => {
        console.log(response)
      },
      error => {
        console.log(error)
      }
    );

    // this.router.navigate(['/']);
  }
}
