import { Component, Input, OnInit } from '@angular/core';
import { Milestone } from '../milestone.class';
import { MilestoneService } from 'src/app/milestone.service';

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrl: './milestone.component.css'
})
export class MilestoneComponent implements OnInit {

    @Input() milestone!: Milestone;

    date!: Date;
    editMode = false;
    expand = false;
    statusButtons = [
        {name: 'Todo', status: 'todo'},
        {name: 'In Progress', status: 'in_progress'},
        {name: 'Completed', status: 'complete'},
        {name: 'Abandoned', status: 'abandoned'}
    ];

    constructor(private milestoneService: MilestoneService) {}

    changeMilestoneStatus(status: string){
        this.milestone.status = status;
        this.milestoneService.updateMilestoneStatus(this.milestone.id, status);
    }

    deleteMilestone(){
        this.milestoneService.deleteMilestone(this.milestone.id, this.milestone.projectId);
    }

    toggleExpand() {
        this.expand = !this.expand;
    }

    toggleEditMode() {
        this.editMode = !this.editMode;
    }

    editMilestone() {
    }

    ngOnInit() {
        this.date = new Date(this.milestone.deadline);
        this.milestoneService.milestoneStatusChange$.subscribe(milestone => {
            if(this.milestone.id === milestone.id){
                this.milestone = milestone;
                this.date = new Date(milestone.deadline);
            }
        });
    }
}
