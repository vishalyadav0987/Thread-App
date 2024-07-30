import { Avatar } from '@chakra-ui/react'
import React from 'react'
import MessageInput from '../MessageInput/MessageInput'
import Messages from '../Message/Messages'

const MessageContainer = () => {
    return (
        <>
            <div className="message-container" style={{
                height: "100%"
            }}>
                <div className="message-header" style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                    background: "#1e1e1e",
                    padding: "0.5rem 0.4rem"
                }}>
                    <Avatar src='./profile.png' size={"sm"} />
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                    }}>
                        <b>Vishalyadav_0987</b>
                        <img src="./verified.png" alt="" style={{
                            width: "18px"
                        }} />
                    </div>
                </div>
                <div className="all-chats-here" style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "16px",
                    marginTop: "8px",
                    marginBottom: "8px",
                    marginLeft: "10px",
                    paddingRight: "8px",
                    overflowY: "scroll",
                    height: "70%"
                }}>
                    <Messages ownMessage={true} />
                    <Messages ownMessage={true} />
                    <Messages ownMessage={false} />
                    <Messages ownMessage={true} />
                    <Messages ownMessage={false} />
                    <Messages ownMessage={false} />
                    <Messages ownMessage={true} />
                    <Messages ownMessage={true} />
                </div>
                <MessageInput />
            </div>
        </>
    )
}

export default MessageContainer
