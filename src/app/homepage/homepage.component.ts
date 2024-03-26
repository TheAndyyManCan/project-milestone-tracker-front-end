import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})

export class HomepageComponent implements OnInit {

    authenticated = false;

    constructor(private auth: AuthService) {}

    ngOnInit() {
        this.auth.authenticated$.subscribe(auth => {
            this.authenticated = auth;
        })
        this.auth.checkUser();
    }

}
