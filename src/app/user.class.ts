export class User {
    constructor(
        public id: number,
        public email: string,
        public name: string,
        public projects: any[]
    ) {}

    clearUser(){
        this.id = -1;
        this.email = "";
        this.name = "";
        this.projects = [];
    }
}
