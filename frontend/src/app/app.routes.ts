import { Routes } from '@angular/router';
import { ChatPageComponent } from './pages/chat-page.component';
import { LoginPageComponent } from './pages/login-page.component';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './auth/register.component';

export const routes: Routes = [
  { path: 'chat', component: ChatPageComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginPageComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', redirectTo: '/login' }, // Fallback route
];
