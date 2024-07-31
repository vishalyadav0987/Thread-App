import { Avatar } from '@chakra-ui/react'
import React from 'react'
import { useAuthContext } from '../../Context/AuthContext'
import { useMessageContext } from '../../Context/MessageContext';


const Messages = ({ ownMessage, message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useMessageContext()
    console.log(authUser?.profilePic, selectedConversation.userProfilePic)

    return (
        <>
            <div style={{
                width: "100%",
                display: "flex",
                justifyContent: `${ownMessage ? "start" : "end"}`,
            }}>
                <div className="chat-bubble" style={{
                    display: "flex",
                    alignItems: 'end',
                    flexDirection: `${ownMessage ? "row" : "row-reverse"}`,
                    gap: "6px",
                    width: "80%",
                    fontSize: "16px",
                }}>
                    <Avatar
                        src={`${ownMessage ? selectedConversation.userProfilePic : authUser?.profilePic}`}
                        size={"sm"}
                    />
                    <div
                        style={{
                            background: `${ownMessage ? "gray" : "#232323"}`,
                            padding: "0.4rem 0.6rem",
                            borderRadius: "4px"
                        }}
                    >{message && message.messageText}</div>
                </div>
            </div>
        </>
    )
}

export default Messages
