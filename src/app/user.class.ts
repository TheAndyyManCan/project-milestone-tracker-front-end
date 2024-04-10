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
    private set setAuthorProjects(projects: Project[]){this.authorProjects = projects;}
    private set setAdminProjects(projects: Project[]){this.adminProjects = projects;}
    private set setTeamMemberProjects(projects: Project[]){this.teamMemberProjects = projects;}
    private set setSpectatorProjects(projects: Project[]){this.spectatorProjects = projects;}

    public setUserFromApi(apiResponse: any, authorProjects: Project[], adminProjects: Project[], teamMemberProjects: Project[], spectatorProjects: Project[]) {
        this.setId = apiResponse.id;
        this.setEmail = apiResponse.email;
        this.setName = apiResponse.name;
        this.setAuthorProjects = authorProjects;
        this.setAdminProjects = adminProjects;
        this.setTeamMemberProjects = teamMemberProjects;
        this.setSpectatorProjects = spectatorProjects;
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
