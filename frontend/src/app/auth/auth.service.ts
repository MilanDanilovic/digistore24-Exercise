import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'; // Ensure HttpClient is imported
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {} // Ensure HttpClient is injected

  // Login method that returns an observable
  login(username: string, password: string): Observable<string> {
    return this.http
      .post<{ accessToken: string }>('http://127.0.0.1:3000/login', {
        username,
        password,
      })
      .pipe(map((response) => response.accessToken));
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
      .pipe(map((response) => response));
  }
}
