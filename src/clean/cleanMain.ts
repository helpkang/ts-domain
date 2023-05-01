//////////// 도메인
// Define the domain entities
type TaskComment = {
    public title: string,
    public description: string,
}
class Task {
    constructor(
      public id: number,
     public taskComment: TaskComment,
      public dueDate: Date,
      public completed: boolean
    ) {}
  }

    // Define the interfaces for the data access layer
    interface TaskDataSource {
        createTask(task: Task): Promise<Task>;
        updateTask(task: Task): Promise<Task>;
        deleteTask(id: number): Promise<void>;
        getTask(id: number): Promise<Task>;
        getAllTasks(): Promise<Task[]>;
      }
      
    
///////////// usecase
  
  // Define the use cases (interactors)
  interface CreateTaskInput {
    title: string;
    description: string;
    dueDate: Date;
  }
  
  interface CreateTaskOutput {
    task: Task;
  }
  
  interface CompleteTaskInput {
    id: number;
  }
  
  interface CompleteTaskOutput {
    task: Task;
  }
  
  interface DeleteTaskInput {
    id: number;
  }
  
  interface DeleteTaskOutput {}
  
  interface GetTaskInput {
    id: number;
  }
  
  interface GetTaskOutput {
    task: Task;
  }
  
  interface GetAllTasksInput {}
  
  interface GetAllTasksOutput {
    tasks: Task[];
  }
  
  interface TaskUseCase {
    createTask(input: CreateTaskInput): Promise<CreateTaskOutput>;
    completeTask(input: CompleteTaskInput): Promise<CompleteTaskOutput>;
    deleteTask(input: DeleteTaskInput): Promise<DeleteTaskOutput>;
    getTask(input: GetTaskInput): Promise<GetTaskOutput>;
    getAllTasks(input: GetAllTasksInput): Promise<GetAllTasksOutput>;
  }
  

  // usecase implement
  // Define the task use case implementation
  class TaskInteractor implements TaskUseCase {
    constructor(private dataSource: TaskDataSource) {}
  
    async createTask(input: CreateTaskInput): Promise<CreateTaskOutput> {
      const task = new Task(
        Math.floor(Math.random() * 1000), // generate a random ID
        input.title,
        input.description,
        input.dueDate,
        false // new tasks are not completed
      );
      const createdTask = await this.dataSource.createTask(task);
      return { task: createdTask };
    }

    async completeTask(input: CompleteTaskInput): Promise<CompleteTaskOutput> {
        const task = await this.dataSource.getTask(input.id);
        task.completed = true;
        const updatedTask = await this.dataSource.updateTask(task);
        return { task: updatedTask };
        }
        
        async deleteTask(input: DeleteTaskInput): Promise<DeleteTaskOutput> {
        await this.dataSource.deleteTask(input.id);
        return {};
        }
        
        async getTask(input: GetTaskInput): Promise<GetTaskOutput> {
        const task = await this.dataSource.getTask(input.id);
        return { task };
        }
        
        async getAllTasks(input: GetAllTasksInput): Promise<GetAllTasksOutput> {
        const tasks = await this.dataSource.getAllTasks();
        return { tasks };
        }
        }
        
        // Define the interfaces for the presentation layer
        interface TaskPresenter {
        presentTask(task: Task): void;
        presentTasks(tasks: Task[]): void;
        presentError(error: Error): void;
        }
        
        // Define the presentation layer implementation
        class ConsoleTaskPresenter implements TaskPresenter {
        presentTask(task: Task): void {
        console.log(Task ID: ${task.id});
        console.log(Title: ${task.title});
        console.log(Description: ${task.description});
        console.log(Due date: ${task.dueDate});
        console.log(Completed: ${task.completed});
        }
        
        presentTasks(tasks: Task[]): void {
        console.log(Total number of tasks: ${tasks.length});
        tasks.forEach(task => this.presentTask(task));
        }
        
        presentError(error: Error): void {
        console.error(error);
        }
        }
        


///////////// repository

  // Define the data access layer implementation
  class InMemoryTaskDataSource implements TaskDataSource {
    private tasks: Task[] = [];
  
    async createTask(task: Task): Promise<Task> {
      this.tasks.push(task);
      return task;
    }
  
    async updateTask(task: Task): Promise<Task> {
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index === -1) {
        throw new Error(`Task with ID ${task.id} not found`);
      }
      this.tasks[index] = task;
      return task;
    }
  
    async deleteTask(id: number): Promise<void> {
      const index = this.tasks.findIndex(t => t.id === id);
      if (index === -1) {
        throw new Error(`Task with ID ${id} not found`);
      }
      this.tasks.splice(index, 1);
    }
  
    async getTask(id: number): Promise<Task> {
      const task = this.tasks.find(t => t.id === id);
      if (!task) {
        throw new Error(`Task with ID ${id} not found`);
      }
      return task;
    }
  
    async getAllTasks(): Promise<Task[]> {
      return this.tasks;
    }
  }
  

  ////
        // Define the controller (interface between presentation and use case layers)
        class TaskController {
        constructor(private taskUseCase: TaskUseCase, private taskPresenter: TaskPresenter) {}
        
        async createTask(title: string, description: string, dueDate: Date): Promise<void> {
        try {
        const result = await this.taskUseCase.createTask({ title, description, dueDate });
        this.taskPresenter.presentTask(result.task);
        } catch (error) {
        this.taskPresenter.presentError(error);
        }
        }
        
        async completeTask(id: number): Promise<void> {
        try {
        const result = await this.taskUseCase.completeTask({ id });
        this.taskPresenter.presentTask(result.task);
        } catch (error) {
        this.taskPresenter.presentError(error);
        }
        }
        
        async deleteTask(id: number): Promise<void> {
        try {
        await this.taskUseCase.deleteTask({ id });
        console.log(Task with ID ${id} deleted);
        } catch (error) {
        this.taskPresenter.presentError(error);
        }
        }
        
        async getTask(id: number): Promise<void> {
        try {
        const result = await this.taskUseCase.getTask({ id });
        this.taskPresenter.presentTask(result.task);
        } catch (error) {
        this.taskPresenter.presentError(error);
        }
        }
        
        async getAllTasks(): Promise<void> {
        try {
        const result = await this.taskUseCase.getAllTasks({});
        this.taskPresenter.presentTasks(result.tasks);
        } catch (error) {
        this.taskPresenter.presentError(error);
        }
        }
        }
        
        // Example usage
        const taskDataSource = new InMemoryTaskDataSource();
        const taskInteractor = new TaskInteractor(taskDataSource);
        const taskPresenter = new ConsoleTaskPresenter();
        const taskController = new TaskController(taskInteractor, taskPresenter);
        
        taskController.createTask('Buy groceries', 'Milk, bread, eggs', new Date('2023-05-01'));
        taskController.createTask('Do laundry', 'Wash clothes and sheets', new Date('2023-05-03'));
        // taskController.getAllTasks
  
   
  