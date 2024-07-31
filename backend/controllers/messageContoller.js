const MessageSchema = require('../modals/MessageSchema');
const ConversationSchema = require('../modals/ConversationSchema');
const { getRecieverSocketId,io } = require('../socket/socket')


// SEND MESSAGE
const sendMessage = async (req, res) => {
    try {
        const { recieverId, messageText } = req.body;
        const { _id: senderId } = req.user;

        // check conversation exist
        let conversation = await ConversationSchema.findOne({
            participants: { $all: [senderId, recieverId] }
        });

        if (!conversation) {
            // create coversation between users
            conversation = new ConversationSchema({
                participants: [senderId, recieverId],
                lastMessage: {
                    messageText,
                    senderId,
                },
            });

            await conversation.save();
        }

        // if conversation exist so create the message
        const newMessage = new MessageSchema({
            conversationId: conversation._id,
            messageText,
            senderId,
        });

        await Promise.all([
            newMessage.save(),
            conversation.updateOne({
                lastMessage: {
                    messageText,
                    senderId,
                },
            }),
        ])

        const recieverIdSocketId = getRecieverSocketId(recieverId)
        if(recieverIdSocketId){
            io.to(recieverIdSocketId).emit("newMessage",newMessage);
            // one to one user conversation use io.to
            // newMessage is event
        }

        res.status(201).json({
            success: true,
            message: "Message Succesfully sent.",
            data: newMessage,
        })
    } catch (error) {
        console.log("Error in sendMessage function ->", error.message);
        res.json({ success: false, message: error.message })
    }
};

// GET MESSAGES
const getMessage = async (req, res) => {
    try {
        const { otherUserId } = req.params;
        const { _id: userId } = req.user;


        const conversation = await ConversationSchema.findOne({
            participants: { $all: [userId, otherUserId] },
        })

        if (!conversation) {
            return res.json({
                success: false,
                message: "Conversation not found."
            })
        }

        const message = await MessageSchema.find({
            conversationId: conversation._id
        }).sort({ createdAt: 1 });

        res.json({
            success: true,
            data: message,
        })
    } catch (error) {
        console.log("Error in getMessage function ->", error.message);
        res.json({ success: false, message: error.message })
    }
}

// GET CONVERSATION
const getConversation = async (req, res) => {
    const { _id: userId } = req.user;
    try {
        const conversations = await ConversationSchema.find({
            participants: userId  //// woh use jinki id logged user se alag hai
        }).populate({
            path: "participants",
            select: "username profilePic"
        })

        conversations.forEach((conversation) => {
            conversation.participants = conversation.participants.filter(
                (participant) => participant._id.toString() !== userId.toString()
            );
        });

        res.json({
            success: true,
            data: conversations,
        })
    } catch (error) {
        console.log("Error in getConversation function ->", error.message);
        res.json({ success: false, message: error.message })
    }
}

module.exports = {
    sendMessage,
    getMessage,
    getConversation,
}