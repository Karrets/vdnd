import mongoose, { Schema } from 'mongoose';
import Message from '#/models/Message';

const messageSchema = new Schema(
  {
    _id: String,
    sender: String,
    content: String,
    timestamp: Number
  },
  { _id: false }
).loadClass(Message);
const messageModel = mongoose.model('Message', messageSchema);

export { messageModel };
