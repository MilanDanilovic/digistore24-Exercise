import { createReducer, on } from '@ngrx/store';
import { loginSuccess, loginFailure, logout } from './auth.actions';

export interface AuthState {
  username: string | null;
  accessToken: string | null;
  error: string | null;
}

export const initialState: AuthState = {
  username: null,
  accessToken: null,
  error: null,
};

export const authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, { username, accessToken }) => {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('username', username);

    return {
      ...state,
      username,
      accessToken,
    };
  }),
  on(loginFailure, (state, { error }) => ({ ...state, error })),
  on(logout, (state) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('username');

    return initialState;
  })
);
