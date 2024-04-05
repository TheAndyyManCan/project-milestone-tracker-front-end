import { User } from "../user.class";
import { Milestone } from "./milestone.class";
import { Permission } from "./permission.class";

export class Project {

    private id!: number;
    private title!: string;
    private deadline!: string;
    private description!: string;
    private timeLeft!: string;
    private authors!: Permission[];
    private admins!: Permission[];
    private teamMembers!: Permission[];
    private spectators!: Permission[];
    private milestones!: Milestone[];

    constructor() {
        this.setId = -1;
        this.setTitle = '';
        this.setDeadline = '';
        this.setDescription = '';
        this.setTimeLeft = '';
        this.setAuthors = [];
        this.setAdmins = [];
        this.setTeamMembers = [];
        this.setSpectators = [];
        this.setMilestones = [];
    }

    // Getters and setters
    public get getId():number {return this.id;}
    public get getTitle():string {return this.title;}
    public get getDeadline():string {return this.deadline;}
    public get getDescription():string {return this.description;}
    public get getTimeLeft():string {return this.timeLeft;}
    public get getAuthors():Permission[] {return this.authors;}
    public get getAdmins():Permission[] {return this.admins;}
    public get getTeamMembers():Permission[] {return this.teamMembers;}
    public get getSpectators():Permission[] {return this.spectators;}
    public get getMilestones():Milestone[] {return this.milestones;}

    private set setId(id: number){this.id = id;}
    private set setTitle(title: string){this.title = title;}
    private set setDeadline(deadline: string){this.deadline = deadline;}
    private set setDescription(description: string){this.description = description;}
    private set setTimeLeft(timeLeft: string){this.timeLeft = timeLeft;}
    private set setAuthors(authors: Permission[]){this.authors = authors;}
    private set setAdmins(admins: Permission[]){this.admins = admins;}
    private set setTeamMembers(teamMembers: Permission[]){this.teamMembers = teamMembers;}
    private set setSpectators(spectators: Permission[]){this.spectators = spectators;}
    private set setMilestones(milestones: Milestone[]){this.milestones = milestones;}

    public setProjectFromApi(apiResponse: any): void {
        this.setId = apiResponse.id;
        this.setTitle = apiResponse.title;
        this.setDeadline = apiResponse.deadline;
        this.setDescription = apiResponse.description;
        this.setTimeLeft = apiResponse.time_left;

        if(apiResponse.milestones){
            for(let milestone of apiResponse.milestones){
                let newMilestone = new Milestone();
                newMilestone.setMilestoneFromApi(milestone);
                this.getMilestones.push(newMilestone);
            }
        }

        if(apiResponse.user_permissions){
            if(apiResponse.user_permissions.author){
                for(let author of apiResponse.user_permissions.author){
                    let newPermission = new Permission();
                    let newAuthor = new User();
                    newAuthor.setUserFromProject(author.user);
                    newPermission.setPermissionFromApi(author, newAuthor);
                    this.getAuthors.push(newPermission);
                }
            }

            if(apiResponse.user_permissions.admin){
                for(let admin of apiResponse.user_permissions.admin){
                    let newPermission = new Permission();
                    let newAdmin = new User();
                    newAdmin.setUserFromProject(admin.user);
                    newPermission.setPermissionFromApi(admin, newAdmin);
                    this.getAdmins.push(newPermission);
                }
            }

            if(apiResponse.user_permissions.team_member){
                for(let teamMember of apiResponse.user_permissions.team_member){
                    let newPermission = new Permission();
                    let newTeamMember = new User();
                    newTeamMember.setUserFromProject(teamMember.user);
                    newPermission.setPermissionFromApi(teamMember, newTeamMember);
                    this.getTeamMembers.push(newPermission);
                }
            }

            if(apiResponse.user_permissions.spectator){
                for(let spectator of apiResponse.user_permissions.spectator){
                    let newPermission = new Permission();
                    let newSpectator = new User();
                    newSpectator.setUserFromProject(spectator.user);
                    newPermission.setPermissionFromApi(spectator, newSpectator);
                    this.getSpectators.push(newPermission);
                }
            }
        }
    }

    public updateProjectFromForm(title: string, description: string, deadline: string): void {
        this.setTitle = title;
        this.setDescription = description;
        this.setDeadline = deadline;
    }
}
