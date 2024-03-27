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

    addMilestone: boolean = false;

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

    toggleAddMilestone(){
        this.addMilestone = !this.addMilestone;
    }
}
