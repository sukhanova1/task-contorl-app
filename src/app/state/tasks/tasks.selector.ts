import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Task } from "src/app/Task";
import { TaskState } from "./tasks.state";

export const selectTasks = createFeatureSelector<TaskState>('tasks'); 

export const selectTasksItems = createSelector(
  selectTasks,
  (state: TaskState) => state.tasks
);

export const selectTaskById = (id: string) => createSelector(
  selectTasksItems,
  (tasks: Task[]) => tasks.find(task => task.id === id)
);

export const selectArchivedTasks = createSelector(
  selectTasksItems,
  (tasks: Task[]) => tasks.filter((task: Task) => task.status === 'Archived')
);

export const selectTasksByStatus = (status: string) => createSelector(
  selectTasksItems,
  (tasks: Task[]) => tasks.filter(task => task.status === status)
);

export const selectTasksCommentsById = (id: string) => createSelector(
  selectTasksItems,
  (tasks: Task[]) => tasks.find(task=> task.id.toString()===id)?.comments
);