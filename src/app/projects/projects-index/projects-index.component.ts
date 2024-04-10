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

    projects = [
        {title: 'Author', projects: this.auth.user.getAuthorProjects},
        {title: 'Admin', projects: this.auth.user.getAdminProjects},
        {title: 'Team Member', projects: this.auth.user.getTeamMemberProjects},
        {title: 'Spectator', projects: this.auth.user.getSpectatorProjects}
    ];

    ngOnInit() {
        this.auth.user$.subscribe(user => {
            this.projects = [
                {title: 'Author', projects: user.getAuthorProjects},
                {title: 'Admin', projects: user.getAdminProjects},
                {title: 'Team Member', projects: user.getTeamMemberProjects},
                {title: 'Spectator', projects: user.getSpectatorProjects}
            ]
        });
        this.auth.checkUser();
    }

    createProject() {
        this.router.navigate(['/projects/create']);
    }

}
