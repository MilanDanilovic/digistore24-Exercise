import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { login, checkAuth } from './auth.actions';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, RouterModule],
  template: `
    <div class="max-w-lg mx-auto mt-12 p-6 bg-white shadow-lg rounded-lg">
      <h1 class="text-3xl font-bold text-center text-gray-800 mb-6">Login</h1>

      <form (ngSubmit)="onSubmit()" class="space-y-4">
        <div>
          <label class="block text-gray-700 text-sm font-medium mb-1">
            Username
          </label>
          <input
            type="text"
            class="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            [(ngModel)]="username"
            name="username"
            placeholder="Enter your username"
            required
          />
        </div>

        <div>
          <label class="block text-gray-700 text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            class="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            [(ngModel)]="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <button
          type="submit"
          class="w-full py-3 px-4 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition duration-300 ease-in-out transform hover:scale-105"
        >
          Login
        </button>
      </form>

      <p class="mt-4 text-center text-sm text-gray-500">
        Don't have an account?
        <a
          class="text-blue-500 hover:underline cursor-pointer"
          routerLink="/register"
          >Register here</a
        >
      </p>
    </div>
  `,
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private store: Store,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    if (this.authService.isAuthenticated()) {
      this.router.navigate(['/chat']);
    }
  }

  onSubmit() {
    this.store.dispatch(
      login({ username: this.username, password: this.password })
    );
  }

  checkAuthentication() {
    this.store.dispatch(checkAuth());
  }
}
