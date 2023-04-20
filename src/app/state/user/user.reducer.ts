import { Action, createReducer, on } from "@ngrx/store";
import * as AuthActions from "./user.actions";
import { authInitialState, AuthState } from "./user.state";

export const authReducer = createReducer(
  authInitialState,
  
  on(AuthActions.loginSuccess, (state, {user}) => ({
    ...state,
    token: user.accessToken,
    user: user.user, 
    serverError: ''
  })),
  
  on(AuthActions.loginFailed, (state, {error}) => ({
    ...state,
    serverError: error
  })),
  
  on(AuthActions.registerSuccess, (state, {user}) => ({
    ...state,
    token: user.accessToken,
    user: user.user,
    serverError: ''
  })),
  
  on(AuthActions.registerFailed, (state, {error}) => ({
    ...state,
    serverError: error
  })),
  
  on(AuthActions.logoutSucsess, state => ({
    ...state,
    serverError: '',
    user: undefined,
    token: undefined
  }))
  
)

export function reducer(state: AuthState | undefined, action: Action) {
  return authReducer(state, action);
}