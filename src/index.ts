import { TaskController } from "./controller/TaskController";
import { InMemoryTaskRepository } from "./repository/task/InMemoryTaskRepository";
import { TaskService } from "./service/task/TaskService";

async function main() {
  const taskRepository = new InMemoryTaskRepository();
  const taskService = new TaskService(taskRepository);
  
  // const task = await taskService.createTask({
  //   title: "Buy groceries",
  //   description: "Milk, bread, eggs",
  //   dueDate: new Date("2023-04-30"),
  // });
  // console.log(task);

  const res: any =  {}

  const taskController = new TaskController(taskService);
  const task = await taskController.createTask({
    body: {
      title: "Buy groceries",
      description: "Milk, bread, eggs",
      dueDate: new Date("2023-04-30"),
    },
  },
  res
  );
    console.log(res.body);

}
// Example usage
main();
