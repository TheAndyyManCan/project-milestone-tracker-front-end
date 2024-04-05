import { Project } from "./projects/project.class";

export class User {

    private id!: number;
    private email!: string;
    private name!: string;
    private projects!: Project[];

    constructor() {
        this.setId = -1;
        this.setEmail = '';
        this.setName = '';
        this.setProjects = [];
    }

    // Getters and setters
    public get getId(){return this.id;}
    public get getEmail(){return this.email;}
    public get getName(){return this.name;}
    public get getProjects(){return this.projects;}

    private set setId(id: number){this.id = id;}
    private set setEmail(email: string){this.email = email;}
    private set setName(name: string){this.name = name;}
    private set setProjects(projects: Project[]){this.projects = projects;}

    public setUserFromApi(apiResponse: any, projects: Project[]) {
        this.setId = apiResponse.id;
        this.setEmail = apiResponse.email;
        this.setName = apiResponse.name;
        this.setProjects = projects;
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
        this.setProjects = [];
    }
}
