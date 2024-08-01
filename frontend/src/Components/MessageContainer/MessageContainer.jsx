import { Avatar, Flex, Skeleton, SkeletonCircle } from '@chakra-ui/react'
import React, { useEffect, useRef, useState } from 'react'
import MessageInput from '../MessageInput/MessageInput'
import Messages from '../Message/Messages'
import { useMessageContext } from '../../Context/MessageContext'
import axios from 'axios';
import toast from 'react-hot-toast'
import { useAuthContext } from '../../Context/AuthContext'
import { useSocketContext } from '../../Context/SocketContext'
import MessageSound from '../../../src/assests/message.mp3'


const MessageContainer = () => {
    const { selectedConversation,
        messages,
        setMessages,
        setConversations,
    } = useMessageContext();
    const { authUser } = useAuthContext()
    const [loading, setLoading] = useState(false);
    const { socket } = useSocketContext();
    useEffect(() => {
        socket?.on("newMessage", (newMesage) => {

            if (selectedConversation._id === newMesage.conversationId) {
                setMessages((prevMessage) => [...prevMessage, newMesage]);
            }

            if (!document.hasFocus()) {
                const sound = new Audio(MessageSound);
                sound.play();
            }
            setConversations((prev) => {
                const updatedConversations = prev.map((conversation) => {
                    if (conversation._id === newMesage.conversationId) {
                        return {
                            ...conversation,
                            lastMessage: {
                                messageText: newMesage.messageText,
                                senderId: newMesage.senderId
                            },
                        };
                    }
                    return conversation;
                });
                return updatedConversations;
            });
        });

        return () => socket.off("newMessage")
    }, [socket, selectedConversation, setConversations, setMessages]);


    useEffect(() => {
        const lastMessageIsFromOtherUser = messages?.length &&
            messages[messages?.length - 1].senderId !== authUser._id;
        if (lastMessageIsFromOtherUser) {
            socket.emit("markMessagesAsSeen", {
                conversationId: selectedConversation._id,
                userId: selectedConversation.userId // reciever Id
            })
            // markMessagesAsSeen [socket event]
        }

        socket.on("messagesSeen", ({ conversationId }) => {
            if (selectedConversation._id === conversationId) {
                setMessages((prev) => {
                    const updatedMessageSeen = prev.map((message) => {
                        if (!message.seen) {
                            return {
                                ...message,
                                seen: true,
                            }
                        }
                        return message;
                    })
                    return updatedMessageSeen;
                })
            }
        })
    }, [socket, selectedConversation, authUser?._id, messages, setMessages])



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
    }, [selectedConversation?.userId, selectedConversation?.mock, setMessages])

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
                    padding: "0.5rem 0.4rem",
                    borderBottom: "1px solid #323232"
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
