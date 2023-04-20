import { Board } from "src/app/Board"; 

export interface BoardState {
  boards: Board[],
  board?: Board,
}

export const initialState: BoardState = {
  boards: [],
}