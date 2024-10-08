import { Component, OnInit } from '@angular/core';
import { NgForOf } from '@angular/common'; // Import NgForOf for *ngFor
import { MessageComponent } from './message.component'; // Import MessageComponent
import { MessageService } from '../services/message.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [NgForOf, MessageComponent],
  template: `
    <div class="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg mb-20">
      <div class="mb-6">
        <h2 class="text-2xl font-semibold text-center text-gray-800">
          Chat Room
        </h2>
        <p class="text-center text-gray-500">
          Messages are updated in real-time
        </p>
      </div>

      <div class="space-y-4 max-h-[300px] overflow-scroll">
        <div *ngFor="let message of messages; index as i">
          <app-message [message]="message" [no]="i"></app-message>
        </div>
      </div>
    </div>
  `,
})
export class ChatComponent implements OnInit {
  messages: any[] = [];
  messagesSubscription!: Subscription;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    // Subscribe to messages observable
    this.messagesSubscription = this.messageService
      .getMessagesObservable()
      .subscribe((messages) => {
        this.messages = messages;
      });

    // Fetch all messages initially
    this.messageService.all();
  }

  ngOnDestroy() {
    // Unsubscribe when the component is destroyed
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }
  }
}
