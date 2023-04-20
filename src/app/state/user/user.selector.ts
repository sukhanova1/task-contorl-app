import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState } from "./user.state";

export const selectAuth = createFeatureSelector<AuthState>('user'); 

export const selectUser = createSelector(
  selectAuth,
  (state: AuthState) => state
);

export const selectServerError = createSelector(
  selectAuth,
  (state: AuthState) => state.serverError
);

export const getAccessToken = createSelector( 
  selectAuth,
(state: AuthState) => state.token ? state.token : ''
);

export const getUserNickName = createSelector(   
  selectUser,
  (state: AuthState) => state.user ? state.user.email : null
);

export const getUserId = createSelector(  
  selectUser,
  (state: AuthState) => state.user ? state.user.id : null
);
