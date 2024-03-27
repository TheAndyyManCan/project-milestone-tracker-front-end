import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Milestone } from './projects/milestone.class';
import axios from 'axios';
import { AuthService } from './auth.service';
import { Project } from './projects/project.class';
import { ProjectService } from './projects/project.service';

@Injectable({
  providedIn: 'root'
})
export class MilestoneService {

    ax = axios.create({
        baseURL: 'http://localhost:8000',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': 'true'
        },
        withCredentials: true,
        withXSRFToken: true
    });

    newMilestone$ = new Subject<any>();
    milestoneStatusChange$ = new Subject<Milestone>();

    constructor(private projectService: ProjectService) { }

    createMilestone(userId:number, projectId:number, name:string, description:string, status:string, deadline:string){
        this.ax.post('api/v1/milestones', {
            user_id: userId,
            project_id: projectId,
            name: name,
            description: description,
            status: status,
            deadline: deadline
        }).then(response => {
            this.newMilestone$.next(
                this.projectService.getProjectById(projectId.toString())
            );
        }).catch(err => {
            console.log(err);
        });
    }

    updateMilestoneStatus(id: number, status: string){
        this.ax.patch('api/v1/milestones/' + id + '/status', {
            status: status
        }).then(response => {
            this.milestoneStatusChange$.next(
                new Milestone(
                    response.data.data.id,
                    response.data.data.project,
                    response.data.data.name,
                    response.data.data.description,
                    response.data.data.status,
                    response.data.data.deadline,
                    response.data.data.time_left,
                    response.data.data.author
                )
            );
        }).catch(err => {
            console.log(err);
        });
    }

    deleteMilestone(id: number, projectId: number){
        this.ax.delete('api/v1/milestones/' + id).then(() => {
            this.newMilestone$.next(
                this.projectService.getProjectById(projectId.toString())
            );
        }).catch(err => {
            console.log(err);
        });
    }
}
