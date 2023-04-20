export interface AuthState {
  serverError: string,
  token?: string,
  user?: any

}

export const authInitialState: AuthState = {
  serverError: '',
};