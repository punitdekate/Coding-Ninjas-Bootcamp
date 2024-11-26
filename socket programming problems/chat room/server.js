// No need to change the pre-written code
// Implement the features in io.on() section
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

export const app = express();
app.use(cors());

export const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("Connection made.");
    socket.on('join', (userDetails) => {
        socket.userName = userDetails.userName;
        socket.roomId = userDetails.roomId;
        socket.join(userDetails.roomId);
    });
    // Write your code here
    socket.on('sendMessage', (message) => {
        let chatDetails = {
            userName: socket.userName,
            roomId: socket.roomId,
            userMessage: message
        }
        socket.to(socket.roomId).emit('message', chatDetails);
    })

    socket.on("disconnect", () => {
        console.log("Connection disconnected.");
    });
});