import { Injectable } from '@angular/core';
import { Message } from '../models/message.model';
import { Store } from '@ngrx/store';
import { selectAccessToken, selectAuthUsername } from '../auth/auth.selectors';
import { BehaviorSubject, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messages: Message[] = [];
  private messagesSubject = new BehaviorSubject<Message[]>([]); // Subject to track messages

  constructor(private store: Store) {}

  // Observable for other components to subscribe to messages
  getMessagesObservable() {
    return this.messagesSubject.asObservable();
  }

  async all() {
    try {
      const token = await firstValueFrom(this.store.select(selectAccessToken));
      const res = await fetch('http://127.0.0.1:3000/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error('Failed to fetch messages');
      }

      const data = await res.json();
      this.messages = data.map(
        (message: any) =>
          new Message(
            message.message,
            message.user,
            new Date(message.timestamp)
          )
      );
      this.messagesSubject.next(this.messages); // Notify all subscribers about new messages
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  }

  async sendMessage(messageText: string) {
    try {
      const token = await firstValueFrom(this.store.select(selectAccessToken));
      const user = await firstValueFrom(this.store.select(selectAuthUsername));

      const res = await fetch('http://127.0.0.1:3000/message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: messageText, user }),
      });

      if (res.ok) {
        const newMessage = await res.json();
        const message = new Message(
          newMessage.message,
          newMessage.user,
          new Date(newMessage.timestamp)
        );
        this.messages.push(message);
        this.messagesSubject.next(this.messages); // Notify subscribers after sending the message
        return message;
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  }
}
