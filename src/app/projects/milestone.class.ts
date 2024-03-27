export class Milestone {
    constructor(
        public id: number,
        public projectId: number,
        public name: string,
        public description: string,
        public status: string,
        public deadline: string,
        public timeLeft: string,
        public author: string
    ) {}
}
