import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { HomepageComponent } from "./homepage/homepage.component";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { authGuard, notAuthGuard } from "./auth.guard";
import { ProjectsIndexComponent } from "./projects/projects-index/projects-index.component";
import { CreateProjectComponent } from "./projects/create-project/create-project.component";
import { ShowProjectComponent } from "./projects/show-project/show-project.component";

const routes: Routes = [
    {path: '', component:HomepageComponent},
    {path: 'login', component:LoginComponent, canActivate:[notAuthGuard]},
    {path: 'register', component:RegisterComponent, canActivate:[notAuthGuard]},
    {path: 'projects', component:ProjectsIndexComponent},
    {path: 'projects/create', component:CreateProjectComponent},
    {path: 'projects/:id', component: ShowProjectComponent}
]

@NgModule({
  imports:[RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
