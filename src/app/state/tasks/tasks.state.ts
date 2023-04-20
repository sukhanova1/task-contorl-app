import { Task } from "src/app/Task";

export interface TaskState {
  tasks: Task[];
}

export const taskInitialState: TaskState = {
  tasks: [],
};