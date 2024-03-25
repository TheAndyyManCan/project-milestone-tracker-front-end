import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

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
