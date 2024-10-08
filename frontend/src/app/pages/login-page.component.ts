import { Component } from '@angular/core';
import { LoginComponent } from '../auth/login.component';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [LoginComponent],
  template: `
    <div class="max-w-md mx-auto">
      <app-login></app-login>
    </div>
  `,
})
export class LoginPageComponent {}
