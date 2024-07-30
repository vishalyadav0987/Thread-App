const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "conversation"
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    messageText: {
        type: String,
        require: true
    },
}, { timestamps: true });

module.exports = mongoose.model("message", MessageSchema);