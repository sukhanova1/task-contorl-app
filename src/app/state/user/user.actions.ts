import { createAction, props } from '@ngrx/store';
import { User } from 'src/app/User';

export const loginLoaded = createAction(
  '[Login] Login Loaded',
  props<{data: User}>()
);

export const loginSuccess = createAction(
  '[Login] Login Success',
  props<{user: any}>()
);

export const loginFailed = createAction(
  '[Login] Login Failed',
  props<{error: string}>()
);

export const registerLoaded = createAction(
  '[Register] Register Loaded',
  props<{data: User}>()
);

export const registerSuccess = createAction(
  '[Register] Register Success',
  props<{user: any}>()
);

export const registerFailed = createAction(
  '[Register] Register Failed',
  props<{error: string}>()
);

export const logoutInitiated = createAction('[Page Header] Logout Initiated');

export const logoutSucsess = createAction('[Page Header] Logout Sucsess');

export const logoutFailed = createAction(
  '[Page Header] Logout Failed',
  props<{error: string}>()
);

export const autoLoadUser = createAction('[Auto Load] Auto Load User Data');
