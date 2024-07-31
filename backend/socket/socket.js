const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const app = express()

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3001",
        methods: ["GET", "POST"]
    }
});

const userSocketMap = {} // id of the connected user
const getRecieverSocketId = (recieverId) => {
    return userSocketMap[recieverId]
}

io.on("connection", (socket) => {
    console.log("User connected ", socket.id);
    const userId = socket.handshake.query.userId;

    if (userId != "undefined") userSocketMap[userId] = socket.id;
    // userId as key and socketId as value [key value pair]
    io.emit("getOnlineUsers", Object.keys(userSocketMap)) // take key convert it to array [1,2,3,45,5]
    // getOnlineUsers [it is event]

    socket.on("disconnect", () => {
        console.log("User disconnect ", socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap)) // take key convert it to array [1,2,3,45,5]
        // update after deleteions
    })
});

module.exports = {
    server, app, io,
    getRecieverSocketId,
}


