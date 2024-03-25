import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpTokenService } from '../http-token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    email: string = "";
    password: string = "";

    public loginForm = new FormGroup({
        email: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required)
    });

    constructor(private auth: AuthService){}

    ngOnInit(): void {
    }

    onSubmit(){
        this.auth.login(this.loginForm.controls.email.value!, this.loginForm.controls.password.value!);
    }

}
