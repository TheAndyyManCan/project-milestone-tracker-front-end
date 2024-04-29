import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

    name: string = "";
    email: string = "";
    password: string = "";
    error: boolean = false;

    public registerForm = new FormGroup({
        name: new FormControl("", Validators.required),
        email: new FormControl("", Validators.required),
        password: new FormControl("", Validators.required),
        confirmPassword: new FormControl("", Validators.required)
    });

    constructor(private auth: AuthService){}

    ngOnInit() {
        this.auth.checkUser();

        this.auth.registrationError$.subscribe(error => {
            this.error = error;
        });
    }

    onSubmit(){
        this.auth.register(this.registerForm.controls.name.value!, this.registerForm.controls.email.value!, this.registerForm.controls.password.value!, this.registerForm.controls.confirmPassword.value!);
    }
}
