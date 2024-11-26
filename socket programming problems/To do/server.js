// Complete the server.js file to make user's add, delete and update the todos.

import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import cors from 'cors'
import Task from './task.schema.js';

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: '*',
        methods: ["GET", "POST"]
    }
})

io.on("connection", (socket) => {
    console.log("connection established");
    socket.on("load_previous_task", async() => {
        const taskList = await Task.find().sort({ timestamp: 1 });
        socket.emit("display_previous_list", taskList);
    })
    socket.on('add_task', async(task) => {
        const newTask = new Task({
            text: task
        });
        await newTask.save();
        socket.broadcast.emit('broadcast_task', task);
    });

    socket.on('delete_task', async(task) => {
        await Task.deleteOne({ text: task });
    });
    socket.on('update_task', async(values) => {
        await Task.updateOne({ text: values.oldValue }, { $set: { text: values.newValue } });
        socket.emit('alert_success');
    })


    socket.on('disconnect', () => {
        console.log("connection disconnect");
    })
})

export { server };