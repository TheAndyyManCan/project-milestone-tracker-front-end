import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserSearchService } from 'src/app/user-search.service';
import { User } from 'src/app/user.class';
import { Project } from '../project.class';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrl: './user-search.component.css'
})
export class UserSearchComponent {

    @Input() project!: Project;
    @Output() addUser = new EventEmitter<User>();

    searchTerm: string = '';
    counter: number = 0;
    searchResult: User[] = [];
    searchDebounce!: any;

    constructor(private searchService: UserSearchService) {}

    searchUsers() {
        this.searchResult = this.searchService.userSearch(this.searchTerm, this.project.getId);
    }

    onChange(event: any) {
        this.searchTerm = event.target.value;

        if(this.searchDebounce) {
            window.clearTimeout(this.searchDebounce);
            this.searchDebounce = setTimeout(this.searchUsers.bind(this), 250);
        } else {
            this.searchDebounce = setTimeout(this.searchUsers.bind(this), 250);
        }
    }

    onAddUser(user: User) {
        this.addUser.emit(user);
    }
}
