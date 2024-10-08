import { Component } from '@angular/core';
import { MessageService } from '../services/message.service';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-create-message',
  standalone: true,
  imports: [FormsModule], // Ensure FormsModule is imported
  template: `
    <form (ngSubmit)="onSubmit()" class="p-4 bg-gray-100 rounded-lg shadow-lg">
      <label class="block mb-4">
        <span class="text-lg font-semibold text-gray-700">Write a Message</span>
        <textarea
          class="block w-full mt-2 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          [(ngModel)]="messageText"
          name="messageText"
          rows="4"
          placeholder="Type your message here..."
          required
        ></textarea>
      </label>

      <button
        type="submit"
        class="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Send Message
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
