import { InjectionToken, Provider } from "@angular/core";

export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';

type TaskStatusOptions = {value: 'open' | 'in-progress' | 'done', text: string, taskStatus: TaskStatus};

// Keeping injection tokens close to value are better or in an altogether separate file.
export const TASK_STATUS_OPTIONS = new InjectionToken<TaskStatusOptions[]>('task-status-options');
export const TaskStatusOptions_: TaskStatusOptions[] = [
  {
    value: 'open',
    taskStatus: 'OPEN',
    text: 'Open'
  },
  {
    value: 'in-progress',
    taskStatus: 'IN_PROGRESS',
    text: 'In-Progress'
  },
  {
    value: 'done',
    taskStatus: 'DONE',
    text: 'Done'
  },
];

// Since we have value and token here, we can create a provider here, and simply export that.
export const taskStatusOptionsProvider: Provider = {
  provide: TASK_STATUS_OPTIONS,
  useValue: TaskStatusOptions_
}

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
