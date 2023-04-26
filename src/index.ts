import { InMemoryTaskRepository } from "./repository/task/InMemoryTaskRepository";
import { TaskService } from "./service/task/TaskService";

async function main() {
  const taskRepository = new InMemoryTaskRepository();
  const taskService = new TaskService(taskRepository);
  
  const task = await taskService.createTask({
    title: "Buy groceries",
    description: "Milk, bread, eggs",
    dueDate: new Date("2023-04-30"),
  });
  console.log(task);
}
// Example usage
main();
