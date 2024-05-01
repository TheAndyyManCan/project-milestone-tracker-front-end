import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProjectsIndexComponent } from './projects/projects-index/projects-index.component';
import { CreateProjectComponent } from './projects/create-project/create-project.component';
import { ShowProjectComponent } from './projects/show-project/show-project.component';
import { MilestoneComponent } from './projects/milestone/milestone.component';
import { AddMilestoneComponent } from './projects/add-milestone/add-milestone.component';
import { FormInputComponent } from './form/form-input/form-input.component';
import { FormTextareaComponent } from './form/form-textarea/form-textarea.component';
import { EditMilestoneComponent } from './projects/edit-milestone/edit-milestone.component';
import { EditProjectComponent } from './projects/edit-project/edit-project.component';
import { ProjectUsersComponent } from './projects/project-users/project-users.component';
import { UserSearchComponent } from './projects/user-search/user-search.component';
import { UserPermissionComponent } from './projects/user-permission/user-permission.component';
import { UserPermissionColumnComponent } from './projects/user-permission-column/user-permission-column.component';
import { EditUserPermissionComponent } from './projects/edit-user-permission/edit-user-permission.component';
import { MilestoneCommentComponent } from './projects/milestone-comment/milestone-comment.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomepageComponent,
    LoginComponent,
    RegisterComponent,
    ProjectsIndexComponent,
    CreateProjectComponent,
    ShowProjectComponent,
    MilestoneComponent,
    AddMilestoneComponent,
    FormInputComponent,
    FormTextareaComponent,
    EditMilestoneComponent,
    EditProjectComponent,
    ProjectUsersComponent,
    UserSearchComponent,
    UserPermissionComponent,
    UserPermissionColumnComponent,
    EditUserPermissionComponent,
    MilestoneCommentComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
