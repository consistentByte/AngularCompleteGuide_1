import { inject, Injectable, signal } from "@angular/core";
import { Task, TaskStatus } from "./task.model";
import { LoggingService } from "../logging.service";

// providedIn: 'root', to make it availble anywhere inside the application
@Injectable({
    providedIn: 'root',
})
//comment the decorator to see null injector error.

export class TasksService {
    private loggingService = inject(LoggingService);

    private tasks = signal<Task[]>([]);

    allTasks = this.tasks.asReadonly();

    addTask(taskData: {title: string, description: string}) {
        const newTask: Task = {
            ...taskData,
            id: Math.random().toString(),
            status: 'OPEN'
        }
        this.tasks.update((oldTasks) => [...oldTasks, newTask]);
        this.loggingService.log('ADDED TASK WITH TITLE '+ taskData.title)
    }

    updateTaskStatus(taskId: string,  newStatus: TaskStatus) {
        // map does an operation to all elements and returns the new array.
        // if we are  changing something we create a new task and return as return the same task object.
        this.tasks.update((oldTasks) => oldTasks.map(task => task.id === taskId ? {...task, status: newStatus} : task));
        this.loggingService.log('CHANGE TASK STATUS '+ newStatus)
    }
}