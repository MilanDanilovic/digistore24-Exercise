import { Component } from '@angular/core';
import { MessageService } from '../services/message.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-create-message',
  standalone: true,
  imports: [FormsModule], // Ensure FormsModule is imported
  template: `
    <form (ngSubmit)="onSubmit()">
      <label>
        <span>Write Message</span>
        <textarea
          class="block w-full"
          [(ngModel)]="messageText"
          name="messageText"
          required
        ></textarea>
      </label>

      <button type="submit" class="mt-4 bg-blue-500 text-white py-2 px-4">
        Send
      </button>
    </form>
  `,
})
export class CreateMessageComponent {
  messageText: string = ''; // Variable bound to the input field

  constructor(private messageService: MessageService) {}

  onSubmit() {
    console.log('Message text:', this.messageText); // Log the message text before sending

    if (this.messageText.trim() === '') {
      alert('Message cannot be empty');
      return;
    }

    this.messageService.sendMessage(this.messageText).then(() => {
      console.log('Message sent');
      this.messageText = ''; // Clear the input after sending the message

      // Fetch all messages after sending a message
      this.messageService.all().then(() => {
        console.log('Messages updated');
      });
    });
  }
}
