import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/auth.service';
import { MilestoneComment } from 'src/app/milestone-comment.class';

@Component({
  selector: 'app-milestone-comment',
  templateUrl: './milestone-comment.component.html',
  styleUrl: './milestone-comment.component.css'
})
export class MilestoneCommentComponent implements OnInit {

    @Input() comment!: MilestoneComment;
    @Input() authPermissionLevel!: number;
    @Output() deleteEvent = new EventEmitter<number>();
    @Output() editEvent = new EventEmitter<any>();

    initials: string = '';
    editMode: boolean = false;
    editForm!: FormGroup;
    editPermission: boolean = false;
    deletePermission: boolean = false;

    constructor(private auth: AuthService){}

    toggleEditMode(){
        this.editMode = !this.editMode;
    }

    editComment(){
        this.editEvent.emit({
            id: this.comment.getId,
            content: this.editForm.controls['content'].value
        });
        this.toggleEditMode();
    }

    deleteComment(){
        this.deleteEvent.emit(this.comment.getId);
    }

    ngOnInit(){
        this.editPermission = this.auth.user.getId == this.comment.getAuthor.getId;
        this.deletePermission = this.auth.user.getId == this.comment.getAuthor.getId || this.authPermissionLevel >= 3;

        const fullName = this.comment.getAuthor.getName.split(' ');
        this.initials = fullName!.shift()!.charAt(0).toUpperCase() + fullName.pop()?.charAt(0).toUpperCase();

        this.editForm = new FormGroup({
            content: new FormControl(this.comment.getContent, Validators.required)
        });
    }
}
