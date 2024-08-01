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
    seen: {
        type: Boolean,
        default: false,
    },
    img:{
        type:String,
        default:"",
    }
}, { timestamps: true });

module.exports = mongoose.model("message", MessageSchema);