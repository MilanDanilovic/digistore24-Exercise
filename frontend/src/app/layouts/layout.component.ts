import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterModule],
  template: `
    <nav class="bg-blue-500 text-white p-4">
      <a routerLink="/chat" class="mr-4">Chat</a>
      <a routerLink="/login" class="mr-4">Login</a>
      <a routerLink="/register" class="mr-4">Register</a>
      <!-- Add Register Link -->
    </nav>
    <div class="container mx-auto mt-4">
      <router-outlet></router-outlet>
    </div>
  `,
})
export class LayoutComponent {}
