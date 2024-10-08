import { Component } from '@angular/core';
import { RouterModule } from '@angular/router'; // For routing
import { LayoutComponent } from './layouts/layout.component'; // Import LayoutComponent

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [LayoutComponent, RouterModule], // Import LayoutComponent and RouterModule
  template: ` <app-layout></app-layout> `,
})
export class AppComponent {
  title = 'Chat Application';
}
