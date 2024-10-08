export class Message {
  message: string;
  user: string;
  timestamp: Date;
  constructor(message: string, user: string, timestamp: Date) {
    this.message = message;
    this.user = user;
    this.timestamp = timestamp;
  }

  empty(): boolean {
    return this.message === '';
  }
}
