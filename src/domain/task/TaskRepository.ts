import { Task } from "./Task";

// Define the task repository interface
export interface TaskRepository
{
    create(task: Task): Promise<Task>;
    update(task: Task): Promise<Task>;
    delete(id: number): Promise<void>;
    getById(id: number): Promise<Task>;
    getAll(): Promise<Task[]>;
}
