import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { FormsModule } from '@angular/forms';
import { register } from '../auth/auth.actions';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule], // Import FormsModule for ngModel
  template: `
    <div class="max-w-md mx-auto mt-8">
      <h1 class="text-2xl mb-4">Register</h1>
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
          Register
        </button>
      </form>
    </div>
  `,
})
export class RegisterComponent {
  username: string = '';
  password: string = '';

  constructor(private store: Store) {}

  onSubmit() {
    // Dispatch the register action
    console.log('Registering', this.username, this.password);
    this.store.dispatch(
      register({ username: this.username, password: this.password })
    );
  }
}
