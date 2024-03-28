import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Milestone } from '../milestone.class';
import { MilestoneService } from '../../milestone.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-milestone',
  templateUrl: './edit-milestone.component.html',
  styleUrl: './edit-milestone.component.css'
})
export class EditMilestoneComponent implements OnInit {

    @Input() milestone!: Milestone;
    @Output() formClosed = new EventEmitter();

    statusButtons = [
        {name: 'Todo', status: 'todo'},
        {name: 'In Progress', status: 'in_progress'},
        {name: 'Completed', status: 'complete'},
        {name: 'Abandoned', status: 'abandoned'}
    ];

    status!: string;

    public editMilestoneForm!: FormGroup;

    constructor(private milestoneService: MilestoneService) {}

    setStatus(status: string){
        this.status = status;
    }

    closeForm(){
        this.formClosed.emit();
    }

    onSubmit(){
        this.milestoneService.updateMilestone(
            this.milestone.id,
            this.milestone.projectId,
            this.editMilestoneForm.controls['name'].value,
            this.editMilestoneForm.controls['description'].value,
            this.status,
            this.editMilestoneForm.controls['deadline'].value,
            this.milestone.author
        );
        this.formClosed.emit();
    }

    ngOnInit() {
        this.status = this.milestone.status;
        this.editMilestoneForm = new FormGroup({
            name: new FormControl(this.milestone.name, Validators.required),
            description: new FormControl(this.milestone.description, Validators.required),
            deadline: new FormControl(this.milestone.deadline, Validators.required)
        });
    }
}
