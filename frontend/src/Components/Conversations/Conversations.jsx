import { Avatar, AvatarBadge, AvatarGroup } from '@chakra-ui/react'
import React from 'react'
import { useAuthContext } from '../../Context/AuthContext'
import { BsCheck2All } from "react-icons/bs";
import { useMessageContext } from '../../Context/MessageContext';

const Conversations = ({ conversation }) => {
    const participants = conversation.participants[0];
    const { authUser } = useAuthContext();
    const { selectedConversation, setSelectedConversation } = useMessageContext();
    return (
        <>
            <div className='conversation-with-user-card'
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "8px 5px",
                    cursor: "pointer",
                    borderBottom: "1px solid #323232",
                    transition: "all 3ms ease",
                    backgroundColor: `${selectedConversation._id === conversation._id ? "#212728" : ""}`
                }}
                onClick={() => {
                    setSelectedConversation({
                        userId: participants._id, // otherUserId
                        _id: conversation?._id,
                        userProfilePic: participants.profilePic,
                        username: participants.username,
                        mock: conversation?.mock
                    })
                }}
            >
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }}>
                    <div>
                        {
                            conversation && (
                                <AvatarGroup size="md" max={2}>
                                    <Avatar
                                        src={participants?.profilePic} alt="User profile" name="User Name">
                                        <AvatarBadge boxSize="1em" bg="green.500" />
                                    </Avatar>
                                </AvatarGroup>
                            )
                        }
                    </div>
                    <div>
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "6px"
                        }}>
                            <b>{conversation && participants?.username}</b>
                            <img src="./verified.png" alt="" style={{
                                width: "18px"
                            }} />
                        </div>
                        <span style={{
                            fontSize: "0.85rem",
                            display: "flex",
                            gap: "3px",
                            alignItems: "center"
                        }}>
                            {authUser?._id === conversation?.lastMessage?.senderId
                                ? <BsCheck2All /> : ""}
                            {conversation && conversation.lastMessage?.messageText?.length > 20
                                ? conversation.lastMessage?.messageText.substring(0, 20) + "..."
                                : conversation.lastMessage?.messageText
                            }
                        </span>
                    </div>
                </div>
                <div style={{
                    color: "#4d4d4d",
                    fontSize: "1rem"
                }}>
                    1d
                </div>

            </div>
        </>
    )
}

export default Conversations
