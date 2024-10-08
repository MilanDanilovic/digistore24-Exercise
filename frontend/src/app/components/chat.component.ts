import {
  Component,
  OnInit,
  AfterViewChecked,
  ViewChild,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { NgForOf } from '@angular/common';
import { MessageComponent } from './message.component';
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

      <div class="space-y-4 max-h-[300px] overflow-scroll" #chatContainer>
        <div *ngFor="let message of messages; index as i">
          <app-message [message]="message" [no]="i"></app-message>
        </div>
      </div>
    </div>
  `,
})
export class ChatComponent implements OnInit, AfterViewChecked, OnDestroy {
  messages: any[] = [];
  messagesSubscription!: Subscription;
  refreshTimeout: any;

  @ViewChild('chatContainer') private chatContainer!: ElementRef;

  constructor(private messageService: MessageService) {}

  ngOnInit() {
    // Subscribe to messages observable
    this.messagesSubscription = this.messageService
      .getMessagesObservable()
      .subscribe((messages) => {
        this.messages = messages;
        this.scrollToBottom(); // Scroll down whenever messages are updated
      });

    // Fetch all messages initially
    this.messageService.all();

    // Set a timer to refresh the page after 1 minute (60000 milliseconds) because the messages are not updated in real-time, I should have used socket.io
    this.refreshTimeout = setTimeout(() => {
      window.location.reload();
    }, 60000);
  }

  ngOnDestroy() {
    if (this.messagesSubscription) {
      this.messagesSubscription.unsubscribe();
    }

    // Clear the refresh timeout to prevent it from running if the component is destroyed
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
    }
  }

  private scrollToBottom(): void {
    try {
      this.chatContainer.nativeElement.scrollTop =
        this.chatContainer.nativeElement.scrollHeight;
    } catch (err) {
      console.error('Scroll Error:', err);
    }
  }

  ngAfterViewChecked(): void {
    this.scrollToBottom();
  }
}
