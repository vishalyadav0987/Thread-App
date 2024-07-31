import { Avatar, Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import MessageInput from '../MessageInput/MessageInput'
import Messages from '../Message/Messages'
import { useMessageContext } from '../../Context/MessageContext'
import axios from 'axios';
import toast from 'react-hot-toast'
import { useAuthContext } from '../../Context/AuthContext'

const MessageContainer = () => {
    const { selectedConversation,
        messages,
        setMessages
    } = useMessageContext();
    const { authUser } = useAuthContext()
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const getMessages = async () => {
            setLoading(true);
            setMessages([]);
            try {
                if (selectedConversation.mock) return;
                const response = await axios.get(
                    `http://localhost:3000/api/v1/message/${selectedConversation?.userId}`, // otherUserId id
                    { withCredentials: true },
                )
                if (response.data.success) {
                    // console.log(response.data.data);
                    setMessages(response.data.data)
                } else {
                    toast.error(response.data.message, {
                        className: 'custom-toast', // Custom class for styling)
                    });
                }
            } catch (error) {
                console.log("Error in getMessages function fronted->", error.message)
                toast.error(error.message, {
                    className: 'custom-toast', // Custom class for styling)
                });
            }
            finally {
                setLoading(false);
            }
        }
        getMessages();
    }, [selectedConversation?.userId])

    const lastMessageRef = useRef();

    useEffect(() => {
        setTimeout(() => {
            lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
        }, 100)
    }, [messages])
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
                    <Avatar
                        src={selectedConversation && selectedConversation?.userProfilePic} size={"sm"} />
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "6px"
                    }}>
                        <b>{selectedConversation && selectedConversation?.username}</b>
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
                    {loading &&
                        [...Array(5)].map((_, i) => (
                            <Flex
                                key={i}
                                gap={2}
                                alignItems={"center"}
                                p={1}
                                borderRadius={"md"}
                                alignSelf={i % 2 === 0 ? "flex-start" : "flex-end"}
                            >
                                {i % 2 === 0 && <SkeletonCircle size={7} />}
                                <Flex flexDir={"column"} gap={2}>
                                    <Skeleton h='8px' w='250px' />
                                    <Skeleton h='8px' w='250px' />
                                    <Skeleton h='8px' w='250px' />
                                </Flex>
                                {i % 2 !== 0 && <SkeletonCircle size={7} />}
                            </Flex>
                        ))}
                    {
                        !loading && (
                            <>
                                {
                                    messages && messages.map((message) => {
                                        return (
                                            <div

                                                ref={messages.length - 1 === messages.indexOf(message) ? lastMessageRef : null}
                                                key={message?._id}
                                            >
                                                <Messages
                                                    ownMessage={authUser?._id !== message?.senderId}
                                                    message={message}
                                                />
                                            </div>
                                        )
                                    })
                                }
                            </>
                        )
                    }
                </div>
                <MessageInput />
            </div>
        </>
    )
}

export default MessageContainer
