import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ProjectService } from '../project.service';
import { Project } from '../project.class';
import { MilestoneService } from 'src/app/milestone.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrl: './show-project.component.css'
})
export class ShowProjectComponent implements OnInit {

    project: Project = new Project();
    project$ = new Subject<Project>();

    showUsers: boolean = false;
    addMilestone: boolean = true;
    editMode: boolean = false;
    permissionLevel: number = 0;
    permission: string = 'none';

    constructor(private route: ActivatedRoute, private auth: AuthService, private projectService: ProjectService, private milestoneService: MilestoneService) {}

    ngOnInit() {
        this.auth.checkUser();

        this.projectService.getProjectById(this.route.snapshot.paramMap.get('id')!).then(response => {
            this.project.setProjectFromApi(response.data.data);
            this.permissionLevel = response.data.data.auth_permission;
            this.setPermissionText(this.permissionLevel);
            this.project$.next(this.project);
        }).catch(err => {
            console.log(err);
        });

        this.milestoneService.newMilestone$.subscribe(project => {
            this.project = project;
            this.addMilestone = false;
        });
    }

    onNewMilestone(milestoneDetails: any){
        this.milestoneService.createMilestone(
            this.auth.user.getId,
            this.project.getId,
            milestoneDetails.title,
            milestoneDetails.description,
            milestoneDetails.status,
            milestoneDetails.deadline
        );
    }

    setPermissionText(level: number){
        switch(level){
            case 1:
                this.permission = 'Spectator';
                break;
            case 2:
                this.permission = 'Team Member';
                break;
            case 3:
                this.permission = 'Admin';
                break;
            case 4:
                this.permission = 'Author';
                break;
            default:
                this.permission = 'None';
                break;
        }
    }

    toggleAddMilestone(){
        this.addMilestone = !this.addMilestone;
    }

    toggleEditMode(){
        this.editMode = !this.editMode;
    }

    toggleShowUsers(){
        this.showUsers = !this.showUsers;
    }
}
