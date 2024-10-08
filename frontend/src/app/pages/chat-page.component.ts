import { Component } from '@angular/core';
import { CreateMessageComponent } from '../components/create-message.component';
import { ChatComponent } from '../components/chat.component';

@Component({
  selector: 'app-chat-page',
  standalone: true,
  imports: [ChatComponent, CreateMessageComponent],
  template: `
    <div class="max-w-md mx-auto flex flex-col pb-20">
      <app-chat></app-chat>
      <app-create-message></app-create-message>
    </div>
  `,
})
export class ChatPageComponent {}
