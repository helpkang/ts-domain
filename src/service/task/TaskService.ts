import { Task } from "../../domain/task/Task";
import { TaskRepository } from "../../domain/task/TaskRepository";

// Define the task service
type CreateTaskType = {
  title: string;
  description: string;
  dueDate: Date;
};

export interface CreateTaskInputPort {
  createTask({
    title,
    description,
    dueDate,
  }: CreateTaskType): Promise<Task>;
}
export class TaskService implements CreateTaskInputPort {
  constructor(private taskRepository: TaskRepository) {}

  async createTask({
    title,
    description,
    dueDate,
  }: CreateTaskType): Promise<Task> {
    const task = new Task(
      Math.floor(Math.random() * 1000),
      title,
      description,
      dueDate,
      false // new tasks are not completed
    );
    return await this.taskRepository.create(task);
  }

  async completeTask(id: number): Promise<Task> {
    const task = await this.taskRepository.getById(id);
    task.completed = true;
    return await this.taskRepository.update(task);
  }

  async deleteTask(id: number): Promise<void> {
    return await this.taskRepository.delete(id);
  }

  async getTask(id: number): Promise<Task> {
    return await this.taskRepository.getById(id);
  }

  async getAllTasks(): Promise<Task[]> {
    return await this.taskRepository.getAll();
  }
}
