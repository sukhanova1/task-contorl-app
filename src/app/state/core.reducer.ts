import {
  ActionReducer,
  ActionReducerMap,
  INIT,
  MetaReducer,
} from '@ngrx/store';
import * as BoardReducer from './boards/boards.reducer';
import * as AuthReducer from './user/user.reducer';
import * as TaskReducer from './tasks/tasks.reducer';
import { State } from './core.state';
import { logoutInitiated } from './user/user.actions';

export const reducers: ActionReducerMap<State> = {
  boards: BoardReducer.reducer,
  user: AuthReducer.reducer,
  tasks: TaskReducer.reducer,
};

export const metaReducers: MetaReducer<State>[] = [logout];

function logout(reducer: ActionReducer<State>): ActionReducer<State> {
  return (state: any, action: any) => {
    if (action != null && action.type === logoutInitiated.type) {
      return reducer(undefined, { type: INIT });
    }
    return reducer(state, action);
  };
}
