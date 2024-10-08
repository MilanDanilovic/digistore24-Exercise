import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { register, checkAuth, login } from './auth.actions';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  template: `
    <div class="max-w-md mx-auto mt-8">
      <h1 class="text-2xl mb-4">Login</h1>
      <form (ngSubmit)="onSubmit()">
        <label>
          <span>Username</span>
          <input
            class="block w-full"
            [(ngModel)]="username"
            name="username"
            required
          />
        </label>

        <label class="mt-4">
          <span>Password</span>
          <input
            class="block w-full"
            [(ngModel)]="password"
            name="password"
            type="password"
            required
          />
        </label>

        <button type="submit" class="mt-4 bg-blue-500 text-white py-2 px-4">
          Login
        </button>
      </form>
    </div>
  `,
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private store: Store) {}

  onSubmit() {
    // Dispatch the register action
    this.store.dispatch(
      login({ username: this.username, password: this.password })
    );
  }

  checkAuthentication() {
    this.store.dispatch(checkAuth());
  }
}
