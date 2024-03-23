import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  name: string = "";
  email: string = "";
  password: string = "";
  error: boolean = false;

  public registerForm = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", Validators.required),
    password: new FormControl("", Validators.required)
  });

  constructor(private http: HttpClient, private router: Router){}

  onSubmit(){
    this.http.post('http://localhost:8000/api/v1/users', this.registerForm.value).subscribe(
      response => {
        this.error = false;
        this.router.navigateByUrl('/login');
      },
      error => {
        this.error = true;
      }
    );

  }
}
