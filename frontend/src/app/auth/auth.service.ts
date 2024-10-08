import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  // Login method that returns an observable
  login(username: string, password: string): Observable<string> {
    return this.http
      .post<{ accessToken: string }>('http://127.0.0.1:3000/login', {
        username,
        password,
      })
      .pipe(
        map((response) => {
          // Store token in localStorage
          localStorage.setItem('accessToken', response.accessToken);
          return response.accessToken;
        }),
        catchError((error) => {
          console.error('Login error:', error);
          return throwError(() => new Error('Login failed'));
        })
      );
  }

  // Register method that returns an observable
  register(
    username: string,
    password: string
  ): Observable<{ accessToken: string; refreshToken: string }> {
    return this.http
      .post<{ accessToken: string; refreshToken: string }>(
        'http://127.0.0.1:3000/register',
        { username, password }
      )
      .pipe(
        map((response) => {
          // Store tokens in localStorage
          localStorage.setItem('accessToken', response.accessToken);
          localStorage.setItem('refreshToken', response.refreshToken);
          return response;
        }),
        catchError((error) => {
          console.error('Registration error:', error);
          return throwError(() => new Error('Registration failed'));
        })
      );
  }

  // Logout method that removes the tokens from localStorage and sends request to server
  logout(): Observable<void> {
    return this.http.post<void>('http://127.0.0.1:3000/logout', {}).pipe(
      map(() => {
        // Remove tokens from localStorage on logout
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }),
      catchError((error) => {
        console.error('Logout error:', error);
        return throwError(() => new Error('Logout failed'));
      })
    );
  }

  // Method to check if the user is authenticated
  isAuthenticated(): boolean {
    return !!localStorage.getItem('accessToken'); // Check if token is present in localStorage
  }
}
