import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-projects-index',
  templateUrl: './projects-index.component.html',
  styleUrl: './projects-index.component.css'
})
export class ProjectsIndexComponent implements OnInit {

    constructor(private auth: AuthService, private router: Router) {}

    projects = this.auth.user.projects;

    ngOnInit() {
        this.auth.checkUser();
    }

    createProject() {
        this.router.navigate(['/projects/create']);
    }
}
