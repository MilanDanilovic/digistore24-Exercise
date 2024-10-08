import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message',
  standalone: true, // Mark as standalone
  template: `
    <div style="background-color: #fff;">
      <span
        >User: {{ message.user?.user || message.user }} said:
        {{ message.message }}
      </span>
    </div>
  `,
})
export class MessageComponent {
  @Input() message: any;
  @Input() no: any;
}
