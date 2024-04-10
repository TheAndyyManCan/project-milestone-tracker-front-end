import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MilestoneService } from 'src/app/milestone.service';
import { Milestone } from '../milestone.class';

@Component({
  selector: 'app-add-milestone',
  templateUrl: './add-milestone.component.html',
  styleUrl: './add-milestone.component.css'
})
export class AddMilestoneComponent {

    @Output() newMilestone = new EventEmitter<object>();
    @Output() closeMilestone = new EventEmitter();

    status = 'todo';
    statusButtons = [
        {name: 'Todo', status: 'todo'},
        {name: 'In Progress', status: 'in_progress'},
        {name: 'Completed', status: 'complete'},
        {name: 'Abandoned', status: 'abandoned'}
    ];

    constructor(private milestoneService: MilestoneService) {}

    setStatus(status: string){
        this.status = status;
    }

    public milestoneForm = new FormGroup({
        title: new FormControl("", Validators.required),
        deadline: new FormControl("", Validators.required),
        description: new FormControl("", Validators.required)
    });

    closeForm() {
        this.closeMilestone.emit();
    }

    onSubmit() {
        this.newMilestone.emit({
            title: this.milestoneForm.controls.title.value!,
            description: this.milestoneForm.controls.description.value!,
            deadline: this.milestoneForm.controls.deadline.value!,
            status: this.status
        });
        this.milestoneForm.reset();
    }
}
