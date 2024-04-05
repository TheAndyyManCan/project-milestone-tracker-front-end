import { User } from "../user.class";

export class Milestone {

    private id!: number;
    private projectId!: number;
    private name!: string;
    private description!: string;
    private status!: string;
    private deadline!: string;
    private timeLeft!: string;
    private author!: number;

    constructor() {
        this.setId = -1;
        this.setProjectId = -1;
        this.setName = '';
        this.setDescription = '';
        this.setStatus = 'todo';
        this.setDeadline = '';
        this.setTimeLeft = '';
        this.setAuthor = -1;
    }

    // Getters and setters
    public get getId():number {return this.id;}
    public get getProjectId():number {return this.projectId;}
    public get getName():string {return this.name;}
    public get getDescription():string {return this.description;}
    public get getStatus():string {return this.status;}
    public get getDeadline():string {return this.deadline;}
    public get getTimeLeft():string {return this.timeLeft;}
    public get getAuthor():number {return this.author;}

    private set setId(id: number) {this.id = id;}
    private set setProjectId(projectId: number) {this.projectId = projectId;}
    private set setName(name: string) {this.name = name;}
    private set setDescription(description: string) {this.description = description;}
    private set setStatus(status: string) {this.status = status;}
    private set setDeadline(deadline: string) {this.deadline = deadline;}
    private set setTimeLeft(timeLeft: string) {this.timeLeft = timeLeft;}
    private set setAuthor(author: number) {this.author = author;}

    public setMilestoneFromApi(apiResource: any): void {
        this.setId = apiResource.id;
        this.setProjectId = apiResource.project;
        this.setName = apiResource.name;
        this.setDescription = apiResource.description;
        this.setStatus = apiResource.status;
        this.setDeadline = apiResource.deadline;
        this.setTimeLeft = apiResource.time_left;
        this.setAuthor = apiResource.author;
    }
}
