import { Component, Input } from '@angular/core';
import { Milestone } from '../milestone.class';

@Component({
  selector: 'app-milestone',
  templateUrl: './milestone.component.html',
  styleUrl: './milestone.component.css'
})
export class MilestoneComponent {

    @Input() milestone!: Milestone;

    statusButtons = [
        {name: 'Todo', status: 'todo'},
        {name: 'In Progress', status: 'in_progress'},
        {name: 'Completed', status: 'complete'},
        {name: 'Abandoned', status: 'abandoned'}
    ];
}
