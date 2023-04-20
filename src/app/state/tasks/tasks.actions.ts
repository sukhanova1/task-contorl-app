import { createAction, props } from "@ngrx/store";
import { Task } from '../../Task';
import { Comment } from '../../Comment';

export const tasksLoaded = createAction(
  '[Tasks] Tasks Loaded',
  props<{ boardId: string}>()
);

export const fetchTasksSuccess = createAction(
  '[Task API] Fetch Task Success',
  props<{ tasks: Task[] }>()
);

export const fetchTasksFailed = createAction(
  '[Task API] Fetch Task Failed',
  props<{ error: any }>()
);

export const addTaskFormSubmitted = createAction(
  '[Add New Task] Add New Task Form Subbmitted',
  props<{ task: Task, id: string }>()
); 

export const addTaskSuccess = createAction(
  '[Task API] Add task Success',
  props<{ task: Task }>()
);

export const addTaskFailed = createAction(
  '[Task API] Add Task Failed',
  props<{ error: any }>()
);

export const editTaskNameFormSubmitted = createAction(
  '[Edit New Task] Edit Task Name Subbmitted',
  props<{ name: string, id: string }>()  
); 

export const editTaskStatusFormSubmitted = createAction(
  '[Edit New Task] Edit Task Status Subbmitted',
  props<{ status: string, id: string }>()
);

export const editTaskSuccess = createAction(
  '[Task API] Edit Task Success',
  props<{ task: any }>()  
);

export const editTaskFailed = createAction(
  '[Task API] Edit Task Failed',
  props<{ error: any }>()
);

export const deleteTaskFormSubmitted = createAction(
  '[Delete New Task] Delete New Task Form Subbmitted',
  props<{ taskId: string }>()
); 

export const deleteTaskSuccess = createAction(
  '[Task API] Delete Task Success',
  props<{ taskId: string }>()  
);

export const deleteTaskFailed = createAction(
  '[Task API] Delete Task Failed',
  props<{ error: any }>()
);

export const addCommentFormSubmited = createAction(
  '[Task API] Add Comment Form Subbmitted',
  props<{ comment: Comment, id: string }>()
);

export const addCommentSuccess = createAction(
  '[Task API] Add Comment Success',
  props<{ comment: string}>()
);

export const addCommentFailed = createAction(
  '[Task API] Add Comment Failed',
  props<{ error: any }>()
);

export const deleteCommentFormSubmited = createAction(
  '[Task API] Delete Comment Form Subbmitted',
  props<{taskId: string, id: string }>()
);