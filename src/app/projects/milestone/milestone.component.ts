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
    @Input() authPermissionLevel!: number;

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
        if(this.authPermissionLevel >= 2){
            this.milestoneService.updateMilestoneStatus(this.milestone.getId, status);
        }
    }

    deleteMilestone(){
        this.milestoneService.deleteMilestone(this.milestone.getId, this.milestone.getProjectId);
    }

    toggleExpand() {
        this.expand = !this.expand;
    }

    toggleEditMode() {
        this.editMode = !this.editMode;
    }

    ngOnInit() {
        this.date = new Date(this.milestone.getDeadline);
        this.milestoneService.milestoneChange$.subscribe(milestone => {
            if(this.milestone.getId === milestone.getId){
                this.milestone = milestone;
                this.date = new Date(milestone.getDeadline);
            }
        });
    }
}
