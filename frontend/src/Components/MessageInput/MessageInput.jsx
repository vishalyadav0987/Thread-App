import { Image, Input, InputGroup, InputRightElement, Spinner, useDisclosure } from '@chakra-ui/react'
import axios from 'axios';
import React, { useRef, useState } from 'react'
import { LuImagePlus, LuSendHorizonal } from 'react-icons/lu'
import { useMessageContext } from '../../Context/MessageContext';
import toast from 'react-hot-toast';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'
import usePreviewImg from '../../CustomHook/usePreviewImg';

const MessageInput = () => {
    const { onClose } = useDisclosure()
    const [inputVal, setInputVal] = useState("");
    const [loading, setLoading] = useState(false)
    const { selectedConversation, setMessages, setConversations } = useMessageContext()
    const selectHandleSendImg = useRef(null);
    const { imageChangeHandle, imageUrl, setImageUrl } = usePreviewImg();
    const [sendImageLoading, setImageLoading] = useState(false);

    const sendMessageHandle = async (e) => {
        e.preventDefault();
        if (!inputVal && !imageUrl) {
            toast.error("message field cannot empty", {
                className: 'custom-toast', // Custom class for styling)
            });
            return;
        }
        if (sendImageLoading) return;
        setImageLoading(true);
        setLoading(true);
        try {
            const response = await axios.post(
                'http://localhost:3000/api/v1/message',
                { messageText: inputVal, recieverId: selectedConversation.userId, img: imageUrl },
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
                setInputVal("");
                setImageUrl("")
            }
        } catch (error) {
            console.log("Error in getMessages function fronted->", error.message)
            toast.error(error.message, {
                className: 'custom-toast', // Custom class for styling)
            });
        }
        finally {
            setLoading(false);
            setImageLoading(false);
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
                        <InputRightElement mx={3}>
                            <div>
                                <LuImagePlus
                                    style={{ marginRight: "6px" }}
                                    cursor={"pointer"}
                                    onClick={() => selectHandleSendImg.current.click()}

                                />
                                <input type="file" hidden
                                    ref={selectHandleSendImg} onChange={imageChangeHandle} />
                            </div>
                            {
                                loading ? <Spinner size={"xs"} />
                                    : (
                                        <LuSendHorizonal
                                            cursor={"pointer"}
                                            onClick={sendMessageHandle}
                                        />
                                    )
                            }
                        </InputRightElement>
                    </InputGroup>
                </div>
            </form>
            <Modal isOpen={imageUrl} onClose={() => {
                onClose()
                setImageUrl("")
            }}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Image src={imageUrl} borderRadius={"6px"} border={"5px solid white"} />
                    </ModalBody>

                    <ModalFooter>
                        {
                            sendImageLoading ? (
                                <Spinner size={"sm"} />
                            ) : (
                                <LuSendHorizonal
                                    size={"20px"}
                                    cursor={"pointer"}
                                    onClick={sendMessageHandle}
                                />
                            )
                        }
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default MessageInput
