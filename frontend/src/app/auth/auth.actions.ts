import { createAction, props } from '@ngrx/store';

export const login = createAction(
  '[Auth] Login',
  props<{ username: string; password: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ username: string; accessToken: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

export const register = createAction(
  '[Auth] Register',
  props<{ username: string; password: string }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ accessToken: string; refreshToken: string }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);
export const logout = createAction('[Auth] Logout');
export const checkAuth = createAction('[Auth] Check Auth');
