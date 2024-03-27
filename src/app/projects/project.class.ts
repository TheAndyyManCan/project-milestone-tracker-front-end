import { Milestone } from "./milestone.class";

export class Project {
    constructor(
        public id: number,
        public title: string,
        public author: number,
        public deadline: string,
        public description: string,
        public timeLeft: string,
        public milestones: Milestone[]
    ) {}
}
