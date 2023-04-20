import { createAction, props } from "@ngrx/store";
import { Board } from "src/app/Board";

export const boardsLoaded = createAction(
  '[Dashboard] Boards Loaded',
  props<{ user_id: number }>()
);

export const fetchBoardSuccess = createAction(
  '[Board API] Fetch Board Success',
  props<{ boards: Board[] }>()
);

export const fetchBoardFailed = createAction(
  '[Board API] Fetch Board Failed',
  props<{ error: any }>()
);

export const addBoardFormSubmitted = createAction(
  '[Add New Board] Add New Board Form Subbmitted',
  props<{ board: Board }>()
); 

export const addBoardSuccess = createAction(
  '[Board API] Add Board Success',
  props<{ board: Board }>()
);

export const addBoadFailed = createAction(
  '[Board API] Add Board Failed',
  props<{ error: any }>()
);

export const editBoardFormSubmitted = createAction(
  '[Edit Board] Edit Board Name Form Subbmitted',
  props<{ board: any }>()  
); 

export const editBoardSuccess = createAction(
  '[Board API] Edit Board Success',
  props<{ board: any }>()  
);

export const editBoadFailed = createAction(
  '[Board API] Edit Board Failed',
  props<{ error: any }>()
);

export const deleteBoardTasksInitiated = createAction(
  '[Delete Board Tasks] Delete Board Tasks Initiated',
  props<{ boardId: string }>()
); 

export const deleteBoardTasksSuccess = createAction(
  '[Board API] Delete Board Tasks Success',
);

export const deleteBoadTasksFailed = createAction(
  '[Board API] Delete Board Tasks Failed',
  props<{ error: any }>()
);

export const deleteBoardInitiated = createAction(
  '[Delete Board Tasks] Delete Board Tasks Initiated',
  props<{ boardId: string }>()
); 

export const deleteBoardSuccess = createAction(
  '[Delete Board Tasks] Delete Board Success',
  props<{ boardId: string }>()
); 

export const deleteBoardFailed = createAction(
  '[Board API] Delete Board Board Failed',
  props<{ error: any }>()
); 

export const editTodoColumnColor = createAction(
  '[Edit Board] Edit Column Color Initiated',
  props<{ toDoColumnColor: string, boardId: string }>()  
); 

export const editInProgressColumnColor = createAction(
  '[Edit Board] Edit Column Color Initiated',
  props<{ inProgressColumnColor: string, boardId: string }>()  
); 

export const editDoneColumnColor = createAction(
  '[Edit Board] Edit Column Color Initiated',
  props<{ doneColumnColor: string, boardId: string }>()  
); 

export const loadBoard = createAction(
  '[Board Details] Load Board Details',
  props<{ boardId: string }>()
);

export const loadBoardSucsess = createAction(
  '[Board Details] Load Board Details Success',
  props<{ board: Board }>()
);

export const loadBoardFailed = createAction(
  '[Board Details] Load Board Details Failed',
  props<{ error: any }>()
);
