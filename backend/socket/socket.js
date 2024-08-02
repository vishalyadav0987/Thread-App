const { Server } = require('socket.io');
const http = require('http');
const express = require('express');
const app = express();
const MessageSchema = require('../modals/MessageSchema')
const ConversationSchema = require('../modals/ConversationSchema')

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://your-frontend-url.onrender.com",
        methods: ["GET", "POST"]
    }
});

const userSocketMap = {} // id of the connected user
const getRecieverSocketId = (recieverId) => {
    return userSocketMap[recieverId]
}

io.on("connection", (socket) => {
    console.log("User connected ");
    const userId = socket.handshake.query.userId;

    if (userId != "undefined") userSocketMap[userId] = socket.id;
    // userId as key and socketId as value [key value pair]
    io.emit("getOnlineUsers", Object.keys(userSocketMap)) // take key convert it to array [1,2,3,45,5]
    // getOnlineUsers [it is event]

    // listen seen event markMessagesAsSeen from MessageContainer
    socket.on("markMessagesAsSeen", async ({ conversationId, userId }) => {        
        try {
            await MessageSchema.updateMany({
                conversationId: conversationId,
                seen: false,
            }, { $set: { seen: true } });
            await ConversationSchema.updateOne({
                _id: conversationId,
            }, { $set: { "lastMessage.seen": true } })
            io.to(userSocketMap[userId]).emit("messagesSeen", { conversationId })
        } catch (error) {
            console.log("Error in Message Seen Function In socket.js -> ", error.message);
        }
    })

    socket.on("disconnect", () => {
        console.log("User disconnect ");
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap)) // take key convert it to array [1,2,3,45,5]
        // update after deleteions
    })
});

module.exports = {
    server, app, io,
    getRecieverSocketId,
}


