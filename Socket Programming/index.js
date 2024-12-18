import express from 'express';
import { Server } from 'socket.io';
import cors from 'cors';
import http from 'http';

const app = express();

// 1.Create server using http 
const server = http.createServer(app);

// 2.Create socket server
const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

//3.Use socket events 
io.on('connection', (socket) => {
    console.log("Connection is established");
    socket.on("join", (name) => {
        socket.userName = name;
    })
    socket.on('new_message', (message) => {
        let userMessage = {
            userName: socket.userName,
            userMessage: message
        }
        console.log(userMessage);
        socket.broadcast.emit("broadcast_message", userMessage);
    })
    socket.on('disconnect', () => {
        console.log("Connection is disconnected");
    })
});

server.listen(4000, () => {
    console.log("App is listening on port 4000");
});