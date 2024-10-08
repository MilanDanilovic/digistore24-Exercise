import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  login,
  loginSuccess,
  loginFailure,
  register,
  registerSuccess,
  registerFailure,
  logout,
} from './auth.actions'; // Import actions
import { of } from 'rxjs';
import { catchError, map, mergeMap, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  // Login Effect
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap((action) => {
        console.log('Login action dispatched'); // Add a log here to verify the effect is triggered
        return this.authService.login(action.username, action.password).pipe(
          map((token) => {
            this.router.navigate(['/chat']);
            return loginSuccess({
              username: action.username,
              accessToken: token,
            });
          }),
          catchError((error) => {
            console.error('Login failed', error); // Log the error
            return of(loginFailure({ error: error.message }));
          })
        );
      })
    )
  );

  // Register Effect
  register$ = createEffect(() =>
    this.actions$.pipe(
      ofType(register),
      mergeMap((action) =>
        this.authService.register(action.username, action.password).pipe(
          map((response) => {
            console.log('Registration successful'); // Log success
            this.router.navigate(['/login']); // Redirect to login after registration
            return registerSuccess({
              accessToken: response.accessToken,
              refreshToken: response.refreshToken,
            });
          }),
          catchError((error) => {
            console.error('Registration failed', error); // Log error
            return of(registerFailure({ error: error.message }));
          })
        )
      )
    )
  );
  // Logout Effect
  logout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this.authService.logout();
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );
}
