import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router, RouterModule } from '@angular/router';
import { User } from 'src/app/user.class';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-projects-index',
  templateUrl: './projects-index.component.html',
  styleUrl: './projects-index.component.css',
})
export class ProjectsIndexComponent implements OnInit {

    constructor(private auth: AuthService, private router: Router) {}

    projects = this.auth.user.projects;

    ngOnInit() {
        this.auth.user$.subscribe(user => {
            this.projects = user.projects;
        });
        this.auth.checkUser();
    }

    createProject() {
        this.router.navigate(['/projects/create']);
    }

}
