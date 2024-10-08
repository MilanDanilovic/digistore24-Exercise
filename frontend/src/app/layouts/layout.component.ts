import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { logout } from '../auth/auth.actions';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav
      class="bg-blue-600 text-white p-4 shadow-md flex items-center justify-between"
    >
      <div class="flex space-x-4">
        <a
          routerLink="/chat"
          class="text-white hover:text-gray-200 transition duration-300"
          >Chat</a
        >
        <a
          routerLink="/login"
          class="text-white hover:text-gray-200 transition duration-300"
          >Login</a
        >
        <a
          routerLink="/register"
          class="text-white hover:text-gray-200 transition duration-300"
          >Register</a
        >
      </div>

      <button
        (click)="logout()"
        class="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Logout
      </button>
    </nav>

    <div class="container mx-auto mt-6">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class LayoutComponent {
  constructor(private store: Store) {}

  logout() {
    this.store.dispatch(logout());
  }
}
