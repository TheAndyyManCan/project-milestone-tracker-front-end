import { User } from "../user.class";

export class Permission {

    private id!: number;
    private user!: User;
    private permissionLevel!: number;

    constructor() {
        this.setId = -1;
        this.setUser = new User();
        this.setPermissionLevel = -1;
    }

    // Getters and setters
    public get getId(){return this.id;}
    public get getUser(){return this.user;}
    public get getPermissionLevel(){return this.permissionLevel;}

    private set setId(id: number){this.id = id;}
    private set setUser(user: User){this.user = user;}
    private set setPermissionLevel(permissionLevel: number){this.permissionLevel = permissionLevel;}

    public setPermissionFromApi(apiResponse: any, user: User){
        this.setId = apiResponse.id;
        this.setPermissionLevel = apiResponse.permission_level;
        this.setUser = user;
    }
}
