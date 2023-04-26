// Define the task entity
export class Task
{
    constructor(
        public id: number,
        public title: string,
        public description: string,
        public dueDate: Date,
        public completed: boolean
    ) { }
}
