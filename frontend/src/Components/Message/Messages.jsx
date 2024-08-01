import { Avatar, Flex, Img, Skeleton } from '@chakra-ui/react'
import React, { useState } from 'react'
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
    const [imgLoaded, setImgLoaded] = useState(false);
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
                    {
                        message.messageText && (
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
                                    width: "100px",
                                    textAlign: "end",
                                    display: "flex",
                                    gap: "5px",
                                    justifyContent: "end"
                                }}>
                                    {
                                        !ownMessage && (<div> <BsCheck2All
                                            style={{
                                                color: `${message.seen ? "#179cf0" : ""}`,
                                                fontSize: "16px"
                                            }}
                                        /></div>)
                                    }
                                    {timeT}
                                </div>


                            </div>
                        )
                    }
                    {message.img && !imgLoaded && (
                        <Flex mt={5} w={"200px"}>
                            <Img
                                src={message.img}
                                hidden
                                onLoad={() => setImgLoaded(true)}
                                alt='Message image'
                                borderRadius={4}
                            />
                            <Skeleton w={"200px"} h={"200px"} />
                        </Flex>
                    )}
                    {
                        message.img && imgLoaded && (
                            <div style={{
                                position: "relative",
                                marginBottom: "16px"
                            }}>
                                <Img
                                    src={message?.img}
                                    width={"200px"}
                                    borderRadius={"6px"}
                                    border={"4px solid #fff"}
                                    position={"relative"}
                                />
                                <div style={{
                                    fontSize: "10px",
                                    fontFamily: "sans-serif",
                                    display: "flex",
                                    gap: "5px",
                                    position: "absolute",
                                    right: "10px",
                                    fontWeight: "600",
                                    bottom: "-20px"
                                }}>
                                    {
                                        !ownMessage && (<div> <BsCheck2All
                                            style={{
                                                color: `${message.seen ? "#179cf0" : ""}`,
                                                fontSize: "16px"
                                            }}
                                        /></div>)
                                    }
                                    {timeT}
                                </div>
                            </div>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Messages
