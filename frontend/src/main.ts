import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http'; // Use provideHttpClient instead of HttpClientModule
import { appConfig } from './app/app.config';
import { provideStore } from '@ngrx/store'; // Add provideStore
import { authReducer } from './app/auth/auth.reducer'; // Import your reducer
import { provideRouter } from '@angular/router'; // Import provideRouter
import { routes } from './app/app.routes'; // Import your routes configuration
import { AuthEffects } from './app/auth/auth.effects';
import { provideEffects } from '@ngrx/effects';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(), // Use this to provide HttpClient to standalone components
    provideStore({ auth: authReducer }),
    provideEffects([AuthEffects]), // Provide NgRx effects (including AuthEffects)
    provideRouter(routes), // Provide the router with your routes
  ],
}).catch((err) => console.error(err));
