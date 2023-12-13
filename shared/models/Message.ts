import { v4 as uuid } from 'uuid';

export default class Message {
  id: string;
  sender: string;
  content: string;
  timestamp: number;

  constructor(from?: any) {
    this.id = from?.id || from?._id || uuid();
    this.sender = from?.sender ?? '';
    this.content = from?.content ?? '';
    this.timestamp = from?.timestamp ?? 0;
  }

  withSender(sender: string): Message {
    let result = new Message(this);
    result.sender = sender;
    return result;
  }
}
