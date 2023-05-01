import { CreateTaskInputPort } from "../service/task/TaskService";

export class TaskController {
    constructor(private createTaskInputPort: CreateTaskInputPort) { }

    async createTask(req: any, res: any) {
        const { title, description, dueDate } = req.body;
        const task = await this.createTaskInputPort.createTask({
            title,
            description,
            dueDate,
        });
        // res.status(201).json(task);
        res['body'] = task
    }

}