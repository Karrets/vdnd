import express from 'express';
import {Server as HTTPServer} from "http";
import {Server} from 'socket.io'

export default function apiRouter(http: HTTPServer) {
    const router = express.Router();
    const io = new Server(http);

    router.get("/api/v1/hello", (_req, res) => {
        res.json({message: "Hello, world!"});
    });

    io.on('connection', socket => {
        socket.on('chat-message', (msg) => {
            console.log(msg);
            io.emit('chat-message', msg);
        })
    })

    return router;
};