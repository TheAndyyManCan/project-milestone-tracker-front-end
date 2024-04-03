import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { ProjectService } from '../project.service';
import { Project } from '../project.class';
import { Milestone } from '../milestone.class';
import { MilestoneService } from 'src/app/milestone.service';

@Component({
  selector: 'app-show-project',
  templateUrl: './show-project.component.html',
  styleUrl: './show-project.component.css'
})
export class ShowProjectComponent implements OnInit {

    project: Project = new Project(-1, '', -1, '', '', '', []);

    showUsers: boolean = true;
    addMilestone: boolean = false;
    editMode: boolean = false;
    permissionLevel: number = 0;
    permission: string = 'none';

    constructor(private route: ActivatedRoute, private auth: AuthService, private projectService: ProjectService, private milestoneService: MilestoneService) {}

    ngOnInit() {
        this.auth.checkUser();

        this.projectService.getProjectById(this.route.snapshot.paramMap.get('id')!).then(response => {
            if(this.auth.user.id === response.data.data.author){
                let milestones = [];
                for(let milestone of response.data.data.milestones){
                    milestones.push(new Milestone(
                        milestone.id,
                        milestone.project,
                        milestone.name,
                        milestone.description,
                        milestone.status,
                        milestone.deadline,
                        milestone.time_left,
                        milestone.author
                    ));
                }
                this.project = new Project(
                    response.data.data.id,
                    response.data.data.title,
                    response.data.data.author,
                    response.data.data.deadline,
                    response.data.data.description,
                    response.data.data.time_left,
                    milestones
                );
                this.permissionLevel = response.data.data.auth_permission;
                this.setPermissionText(this.permissionLevel);
            }
        }).catch(err => {
            console.log(err);
        });

        this.milestoneService.newMilestone$.subscribe(project => {
            project.then((response: any) => {
                let milestones = [];
                for(let milestone of response.data.data.milestones){
                    milestones.push(new Milestone(
                        milestone.id,
                        milestone.project,
                        milestone.name,
                        milestone.description,
                        milestone.status,
                        milestone.deadline,
                        milestone.time_left,
                        milestone.author
                    ));
                }
                this.project = new Project(
                    response.data.data.id,
                    response.data.data.title,
                    response.data.data.author,
                    response.data.data.deadline,
                    response.data.data.description,
                    response.data.data.time_left,
                    milestones
                );
                this.permissionLevel = response.data.data.auth_permission;
                this.setPermissionText(this.permissionLevel);
                this.addMilestone = false;
            }).catch((err: any) => {
                console.log(err);
            })
        });
    }

    onNewMilestone(milestoneDetails: any){
        this.milestoneService.createMilestone(
            this.auth.user.id,
            this.project.id,
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
                this.permission = 'Team member';
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
