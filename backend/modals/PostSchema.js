const mongoose = require('mongoose');


const PostSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user",
        required: true,
    },
    text: {
        type: String,
        minLength: 500,
    },
    img: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0,
    },
    replies: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "user",
                required: true,
            },
            text: {
                type: String,
                required: true,
            },
            userProfilePic: {
                type: String,
            },
            username: {
                type: String,
                required: true,
            }
        },

    ]
}, { timestamps: true });


module.exports = mongoose.model('post', PostSchema);