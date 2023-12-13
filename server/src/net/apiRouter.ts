import express from 'express';
import { Server as HTTPServer } from 'http';
import { Server } from 'socket.io';
import { messageModel } from '_/db/schema';

export default function apiRouter(http: HTTPServer) {
  const router = express.Router();
  const io = new Server(http);

  router.get('/api/chat/get', async (_req, res) => {
    let messages = await messageModel.find({}).sort('timestamp').lean();
    res.json(messages);
  });

  io.on('connection', (socket) => {
    socket.on('chat-message', (msg) => {
      new messageModel({
        _id: msg.id,
        sender: msg.sender,
        content: msg.content,
        timestamp: Date.now()
      })
        .save()
        .then(() => {
          io.emit('chat-message', msg);
          io.emit('send-succeed');
        })
        .catch((err) => {
          console.log(err);
          socket.emit('send-failed', { msg, err });
        });
    });
  });

  return router;
}
