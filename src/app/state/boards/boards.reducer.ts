import { Action, createReducer, on, UPDATE } from "@ngrx/store";
import { BoardState, initialState } from "./boards.state";
import * as BoardActions from './boards.actions';

const boardReducer = createReducer(
  initialState,
  on(BoardActions.fetchBoardSuccess, (state, { boards }) => ({
    ...state, boards: boards
  })),
  
  on(BoardActions.loadBoardSucsess, (state, { board }) => ({
    ...state, board: board
  })),
  
  on(BoardActions.addBoardSuccess, (state, { board }) => {
    const updated = [...state.boards, board];
    return { ...state, boards: updated };
  }),
  
  on(BoardActions.editBoardSuccess, (state, { board }) => {
    const boardIndex = state.boards.findIndex(item => item.id === board.id);
    const updatedBoards = [...state.boards];
  
    updatedBoards[boardIndex] = board;
    
    return { ...state, boards: updatedBoards, board: board };
  }),
  
  on(BoardActions.deleteBoardSuccess, (state, { boardId }) => {
    const boardIndex = state.boards.findIndex(item => item.id === boardId);
    const updated = [...state.boards];
    
    updated.splice(boardIndex, 1);
    
    return { ...state, boards: updated };
  })
)

export function reducer(state: BoardState | undefined, action: Action) {
  return boardReducer(state, action);
}