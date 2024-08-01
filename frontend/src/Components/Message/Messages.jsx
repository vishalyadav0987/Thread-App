import { Avatar } from '@chakra-ui/react'
import React from 'react'
import './Messages.css'
import { useAuthContext } from '../../Context/AuthContext'
import { useMessageContext } from '../../Context/MessageContext';
import { BsCheck2All } from "react-icons/bs";
import useDateConvertHook from "../../../src/CustomHook/useDateConvertHook";


const Messages = ({ ownMessage, message }) => {
    const { authUser } = useAuthContext();
    const { selectedConversation } = useMessageContext();
    const { functionToConvertDate } = useDateConvertHook()
    const timeT = functionToConvertDate(message.createdAt);
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
                    width: "85%",
                    fontSize: "16px",
                }}>
                    <Avatar
                        src={`${ownMessage ? selectedConversation.userProfilePic : authUser?.profilePic}`}
                        size={"sm"}
                    />
                    <div
                        className={`bubble ${ownMessage ? "left" : "right"}`}
                        style={{
                            background: `${ownMessage ? "gray" : "#101010"}`,
                            padding: "0.4rem 0.6rem",
                            display: "flex",
                            gap: "6px",
                            alignItems: "end",
                        }}
                    >
                        <div>
                            {message && message.messageText}
                        </div>

                        

                        <div style={{
                            fontSize: "10px",
                            fontFamily: "sans-serif",
                            width:"100px",
                            textAlign:"end",
                            display:"flex",
                            gap:"5px",
                            justifyContent:"end"
                        }}>
                            {
                                !ownMessage && (<div> <BsCheck2All
                                    style={{
                                        color: `${message.seen ? "#179cf0" : ""}`,
                                        fontSize:"16px"
                                    }}
                                /></div>)
                            }
                            {timeT}
                        </div>


                    </div>
                </div>
            </div>
        </>
    )
}

export default Messages
