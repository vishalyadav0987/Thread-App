const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    ],
    lastMessage: {
        messageText: {
            type: String,
            required: true,
        },
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "user"
        }
    }
}, { timestamps: true });

module.exports = mongoose.model("conversation", ConversationSchema);