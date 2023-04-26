import { Task } from "../../domain/task/Task";
import { TaskRepository } from "../../domain/task/TaskRepository";

// Define the task repository implementation using an in-memory store
export class InMemoryTaskRepository implements TaskRepository
{
    private tasks: Task[] = [];

    async create(task: Task): Promise<Task>
    {
        this.tasks.push(task);
        return task;
    }

    async update(task: Task): Promise<Task>
    {
        const index = this.tasks.findIndex((t) => t.id === task.id);
        if (index === -1)
        {
            throw new Error(`Task with ID ${ task.id } not found`);
        }
        this.tasks[index] = task;
        return task;
    }

    async delete(id: number): Promise<void>
    {
        const index = this.tasks.findIndex((t) => t.id === id);
        if (index === -1)
        {
            throw new Error(`Task with ID ${ id } not found`);
        }
        this.tasks.splice(index, 1);
    }

    async getById(id: number): Promise<Task>
    {
        const task = this.tasks.find((t) => t.id === id);
        if (!task)
        {
            throw new Error(`Task with ID ${ id } not found`);
        }
        return task;
    }

    async getAll(): Promise<Task[]>
    {
        return this.tasks;
    }
}
