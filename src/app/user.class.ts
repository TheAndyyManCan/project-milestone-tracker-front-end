import { Project } from "./projects/project.class";

export class User {

    private id!: number;
    private email!: string;
    private name!: string;
    private authorProjects!: Project[];
    private adminProjects!:Project[];
    private teamMemberProjects!: Project[];
    private spectatorProjects!: Project[];

    constructor() {
        this.setId = -1;
        this.setEmail = '';
        this.setName = '';
        this.setAuthorProjects = [];
        this.setAdminProjects = [];
        this.setTeamMemberProjects = [];
        this.setSpectatorProjects = [];
    }

    // Getters and setters
    public get getId(){return this.id;}
    public get getEmail(){return this.email;}
    public get getName(){return this.name;}
    public get getAuthorProjects(){return this.authorProjects;}
    public get getAdminProjects(){return this.adminProjects;}
    public get getTeamMemberProjects(){return this.teamMemberProjects;}
    public get getSpectatorProjects(){return this.spectatorProjects;}

    private set setId(id: number){this.id = id;}
    private set setEmail(email: string){this.email = email;}
    private set setName(name: string){this.name = name;}

    private set setAuthorProjects(projects: any){
        this.authorProjects = [];
        for(let project of projects){
            let newProject = new Project();
            newProject.setProjectFromApi(project);
            this.authorProjects.push(newProject);
        }
    }

    private set setAdminProjects(projects: any){
        this.adminProjects = [];
        for(let project of projects){
            let newProject = new Project();
            newProject.setProjectFromApi(project);
            this.adminProjects.push(newProject);
        }
    }

    private set setTeamMemberProjects(projects: any){
        this.teamMemberProjects = [];
        for(let project of projects){
            let newProject = new Project();
            newProject.setProjectFromApi(project);
            this.teamMemberProjects.push(newProject);
        }
    }

    private set setSpectatorProjects(projects: any){
        this.spectatorProjects = [];
        for(let project of projects){
            let newProject = new Project();
            newProject.setProjectFromApi(project);
            this.spectatorProjects.push(newProject);
        }
    }

    public setUserFromApi(apiResponse: any) {
        this.setId = apiResponse.id;
        this.setEmail = apiResponse.email;
        this.setName = apiResponse.name;
        this.setAuthorProjects = apiResponse.projects.author;
        this.setAdminProjects = apiResponse.projects.admin;
        this.setTeamMemberProjects = apiResponse.projects.team_member;
        this.setSpectatorProjects = apiResponse.projects.spectator;
    }

    public setUserFromProject(projectResponse: any) {
        this.setId = projectResponse.id;
        this.setName = projectResponse.name;
        this.setEmail = projectResponse.email;
    }

    public clearUser(){
        this.setId = -1;
        this.setEmail = "";
        this.setName = "";
        this.setAuthorProjects = [];
        this.setAdminProjects = [];
        this.setTeamMemberProjects = [];
        this.setSpectatorProjects = [];
    }
}
