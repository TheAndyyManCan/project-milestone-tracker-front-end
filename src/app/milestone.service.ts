import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Milestone } from './projects/milestone.class';
import axios from 'axios';
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
    milestoneChange$ = new Subject<Milestone>();

    constructor(private projectService: ProjectService) { }

    changeMilestone(responseData: any){
        let milestone = new Milestone();
        milestone.setMilestoneFromApi(responseData);
        this.milestoneChange$.next(milestone);
    }

    createMilestone(userId:number, projectId:number, name:string, description:string, status:string, deadline:string){
        this.ax.post('api/v1/milestones', {
            user_id: userId,
            project_id: projectId,
            name: name,
            description: description,
            status: status,
            deadline: deadline
        }).then(() => {
            this.newMilestone$.next(this.projectService.returnProjectById(projectId));
        }).catch(err => {
            console.log(err);
        });
    }

    updateMilestoneStatus(id: number, status: string){
        this.ax.patch('api/v1/milestones/' + id + '/status', {
            status: status
        }).then(response => {
            this.changeMilestone(response.data.data);
        }).catch(err => {
            console.log(err);
        });
    }

    updateMilestone(id: number, projectId: number, name: string, description: string, status: string, deadline: string, author: number){
        this.ax.patch('api/v1/milestones/' + id, {
            user_id: author,
            project_id: projectId,
            name: name,
            description: description,
            status: status,
            deadline: deadline
        }).then(response => {
            this.changeMilestone(response.data.data);
        }).catch(err => {
            console.log(err);
        });
    }

    deleteMilestone(id: number, projectId: number){
        this.ax.delete('api/v1/milestones/' + id).then(() => {
            this.newMilestone$.next(this.projectService.returnProjectById(projectId));
        }).catch(err => {
            console.log(err);
        });
    }

    addComment(authorId: number, milestoneId: number, content: string){
        this.ax.post('api/v1/milestonecomments', {
            user_id: authorId,
            milestone_id: milestoneId,
            content: content
        }).then(response => {
            this.changeMilestone(response.data.data);
        }).catch(err => {
            console.log(err);
        });
    }

    deleteComment(commentId: number){
        this.ax.delete('api/v1/milestonecomments/' + commentId).then(response => {
            this.changeMilestone(response.data.data);
        }).catch(err => {
            console.log(err);
        });
    }

    editComment(commentId: number, content: string){
        this.ax.patch('api/v1/milestonecomments/' + commentId, {
            content: content
        }).then(response => {
            this.changeMilestone(response.data.data);
        }).catch(err => {
            console.log(err);
        });
    }
}
