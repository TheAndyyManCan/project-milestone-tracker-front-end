import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

    nav = [
        {link: "", text: ""}
    ];

    authSubscription = new Subscription;
    authenticated = false;

    constructor(private auth: AuthService) {}

    ngOnInit() {
        if(this.authenticated){
            this.nav = [
                {link: "#", text: "Projects"},
            ];
        } else {
            this.nav = [
                {link: "/register", text: "Register"},
                {link: "/login", text: "Login"}
            ];
        }
        this.authSubscription = this.auth.authenticated$.subscribe(auth => {
            if(auth){
                this.nav = [
                    {link: "#", text: "Projects"},
                ];
                this.authenticated = true;
            } else {
                this.nav = [
                    {link: "/register", text: "Register"},
                    {link: "/login", text: "Login"}
                ];
                this.authenticated = false;
            }
        });
    }

    ngOnDestroy() {
        this.authSubscription.unsubscribe();
    }

    logout(){
        this.auth.logout();
    }
}
