const MessageSchema = require('../modals/MessageSchema');
const ConversationSchema = require('../modals/ConversationSchema');


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
            newMessage,
            conversation.updateOne({
                lastMessage: {
                    messageText,
                    senderId,
                },
            }),
        ])

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


module.exports = {
    sendMessage,
}