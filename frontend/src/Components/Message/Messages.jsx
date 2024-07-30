import { Avatar } from '@chakra-ui/react'
import React from 'react'


const Messages = ({ ownMessage }) => {
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
                    <Avatar scr='./profile.png' size={"sm"} />
                    <div
                        style={{
                            background: `${ownMessage ? "gray" : "#232323"}`,
                            padding: "0.6rem 0.3rem",
                            borderRadius: "4px"
                        }}
                    >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illum, vitae!</div>
                </div>
            </div>
        </>
    )
}

export default Messages
