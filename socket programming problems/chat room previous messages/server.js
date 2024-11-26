// don't change the prewritten code
// change the code for 'join' event

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import { messageModel } from './message.schema.js';
import { isObjectLiteralElement } from 'typescript';

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

    socket.on("join", async(data) => {
        // Emit a welcome message to the user who joined
        // socket.emit("welcome_message", `Welcome, ${data.username}!`)
        // write your code here
        // console.log(data);
        const messages = await messageModel.find({ room: data.room }).sort({ timestamp: 1 })
        socket.emit("previousMessages", messages)
    });

    socket.on("sendMessage", async(data) => {

        const message = new messageModel({
            username: data.username,
            text: data.message,
            room: data.room
        })

        await message.save();

        // Broadcast the received message to all users in the same room
        io.to(data.room).emit("message", {
            username: data.username,
            text: data.message
        });
    });

    socket.on("disconnect", () => {
        console.log("Connection disconnected.");
    });
});