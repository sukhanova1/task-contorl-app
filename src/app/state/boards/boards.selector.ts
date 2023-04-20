import { createFeatureSelector, createSelector } from "@ngrx/store";
import { Board } from "src/app/Board";
import { BoardState } from "./boards.state";

export const selectBoards = createFeatureSelector<BoardState>('boards'); 

export const selectBoardItems = createSelector(
  selectBoards,
  (state: BoardState) => state.boards
);

export const selectBoard = createSelector(
  selectBoards,
  (state: BoardState) => state.board
);

export const selectBoardItem = (id: string) => createSelector(
  selectBoardItems,
  boards => boards.filter((board: Board) => board.id.toString() === id)[0]
);
