import { User } from "./user.class";

export class MilestoneComment {

    private id!: number;
    private author!: User;
    private content!: string;

    constructor() {
        this.setId = -1;
        this.setAuthor = new User();
        this.setContent = '';
    }

    // Getters and setters
    public get getId():number {return this.id;}
    public get getAuthor():User {return this.author;}
    public get getContent():string {return this.content;}

    private set setId(id:number) {this.id = id;}
    private set setAuthor(author:User) {this.author = author;}
    private set setContent(content:string) {this.content = content;}

    public setMilestoneCommentFromApi(apiResource: any): void {
        this.setId = apiResource.id;
        this.getAuthor.setUserFromProject(apiResource.author);
        this.setContent = apiResource.content;
    }
}
