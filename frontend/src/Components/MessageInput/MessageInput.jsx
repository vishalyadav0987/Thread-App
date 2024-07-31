import { Input, InputGroup, InputRightElement, Spinner } from '@chakra-ui/react'
import axios from 'axios';
import React, { useState } from 'react'
import { LuSendHorizonal } from 'react-icons/lu'
import { useMessageContext } from '../../Context/MessageContext';
import toast from 'react-hot-toast';

const MessageInput = () => {
    const [inputVal, setInputVal] = useState("");
    const [loading, setLoading] = useState(false)
    const { selectedConversation, setMessages, setConversations } = useMessageContext()
    const sendMessageHandle = async (e) => {
        e.preventDefault();
        if (!inputVal) {
            toast.error("message field cannot empty", {
                className: 'custom-toast', // Custom class for styling)
            });
            return;
        }
        setLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:3000/api/v1/message',
                { messageText: inputVal, recieverId: selectedConversation.userId },
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            )
            if (response.data.success) {
                toast.success(response.data.message, {
                    className: 'custom-toast', // Custom class for styling)
                });
                setMessages((message) => [...message, response.data.data]);
                setConversations((prevCon) => {
                    const updateConversation = prevCon.map((conversation) => {
                        if (conversation._id === selectedConversation._id) {
                            return {
                                ...conversation,
                                lastMessage: {
                                    messageText: inputVal,
                                    senderId: response.data.data.senderId,
                                }
                            }
                        }
                        return conversation;
                    })
                    return updateConversation;
                })
                setInputVal("")
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


    return (
        <>
            <form>
                <div style={{
                    position: "absolute",
                    bottom: "0px",
                    width: "100%",
                    background: "#1e1e1e",
                    padding: "0.5rem 0.4rem"
                }}>
                    <InputGroup>
                        <Input type='text'
                            placeholder='Type message here...'
                            focusBorderColor='#ffef'
                            onChange={(e) => { setInputVal(e.target.value) }}
                            value={inputVal}
                        />
                        <InputRightElement>
                            {
                                loading ? <Spinner size={"xs"} />
                                    : (
                                        <LuSendHorizonal
                                            cursor={"pointer"}
                                            size={"22px"}
                                            onClick={sendMessageHandle}
                                        />
                                    )
                            }
                        </InputRightElement>
                    </InputGroup>
                </div>
            </form>
        </>
    )
}

export default MessageInput
