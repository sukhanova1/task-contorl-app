import { createReducer, on, Action } from '@ngrx/store';
import * as TasksActions from '../tasks/tasks.actions';
import { taskInitialState, TaskState} from './tasks.state';

const taskReducer = createReducer(
  taskInitialState,
  
  on(TasksActions.fetchTasksSuccess, (state, { tasks }) => ({
    ...state, tasks: tasks
  })),
  
  on(TasksActions.addTaskSuccess, (state, { task }) => {
    const updated = [...state.tasks, task];    
    return { ...state, tasks: updated };
  }),
  
  on(TasksActions.editTaskSuccess, (state, { task }) => {
    const taskIndex = state.tasks.findIndex(item => item.id === task.id);
    const updated = [...state.tasks];
    
    updated[taskIndex] = task;
    
    return { ...state, tasks: updated };
  }),
  
  on(TasksActions.deleteTaskSuccess, (state, { taskId }) => {
    const taskIndex = state.tasks.findIndex(item => item.id === taskId);
    const updated = [...state.tasks];
    
    updated.splice(taskIndex, 1);
    
    return { ...state, tasks: updated };
  })
);

export function reducer(state: TaskState | undefined, action: Action) {
  return taskReducer(state, action);
}
