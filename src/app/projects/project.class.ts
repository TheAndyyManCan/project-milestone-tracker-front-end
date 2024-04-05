import { Milestone } from "./milestone.class";
import { Permission } from "./permission.class";

export class Project {

    private id!: number;
    private title!: string;
    private deadline!: string;
    private description!: string;
    private timeLeft!: string;
    private permissions!: Permission[];
    private milestones!: Milestone[];

    constructor() {
        this.setId = -1;
        this.setTitle = '';
        this.setDeadline = '';
        this.setDescription = '';
        this.setTimeLeft = '';
        this.setPermissions = [];
        this.setMilestones = [];
    }

    // Getters and setters
    public get getId(){return this.id;}
    public get getTitle(){return this.title;}
    public get getDeadline(){return this.deadline;}
    public get getDescription(){return this.description;}
    public get getTimeLeft(){return this.timeLeft;}
    public get getPermissions(){return this.permissions;}
    public get getMilestones(){return this.milestones;}

    private set setId(id: number){this.id = id;}
    private set setTitle(title: string){this.title = title;}
    private set setDeadline(deadline: string){this.deadline = deadline;}
    private set setDescription(description: string){this.description = description;}
    private set setTimeLeft(timeLeft: string){this.timeLeft = timeLeft;}
    private set setPermissions(permissions: Permission[]){this.permissions = permissions;}
    private set setMilestones(milestones: Milestone[]){this.milestones = milestones;}
}
