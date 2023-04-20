import { BoardState } from "./boards";
import { AuthState } from "./user/user.state";
import { TaskState } from "./tasks/tasks.state";

export interface State {
  boards: BoardState;
  user: AuthState;
  tasks: TaskState;
}