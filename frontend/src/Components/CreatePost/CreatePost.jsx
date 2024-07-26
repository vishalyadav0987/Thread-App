import React, { useRef, useState } from 'react'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { FaPlus } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";
import { ImCross } from "react-icons/im";
import usePreviewImg from '../../CustomHook/usePreviewImg'
import axios from 'axios';
import { useAuthContext } from '../../Context/AuthContext'
import toast from 'react-hot-toast';

const Max_Text_Size = 500;


const CreatePost = () => {
    const { authUser } = useAuthContext()
    const haandleTap = useRef(null)
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { imageChangeHandle, imageUrl, setImageUrl } = usePreviewImg();
    const [postText, setPostText] = useState('');
    const [postTextSize, setPostTextSize] = useState(Max_Text_Size);
    const [loading, setLoading] = useState(false);

    const handleTextChange = (e) => {
        const textareaValue = e.target.value;
        if (textareaValue.length > Max_Text_Size) {
            const remainingText = textareaValue.slice(0, Max_Text_Size)
            setPostText(remainingText);
            setPostTextSize(0);
        }
        else {
            setPostText(textareaValue);
            setPostTextSize(0 + textareaValue.length)
        }
    }
    const createPostHandler = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
            const response = await axios.post(
                `http://localhost:3000/api/v1/post/create`,
                { postedBy: authUser._id, text: postText, img: imageUrl },
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );

            if (response.data.success) {
                toast.success(response.data.message, {
                    className: 'custom-toast', // Custom class for styling)
                });
                setPostText("");
                setImageUrl("")
                onClose();
            }
            else {
                toast.error(response.data.message, {
                    className: 'custom-toast', // Custom class for styling)
                })
            }

        } catch (error) {
            console.log("Error in CreatePostHandler->", error.message)
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div>
                <Button
                    onClick={onOpen}
                    style={{
                        display: "flex",
                        gap: "5px",
                        alignItems: "center",
                        position: "fixed",
                        bottom: "20px",
                        right: "14px"
                    }} fontSize={"md"}
                >
                    <FaPlus />
                    <p>Post</p>
                </Button>
            </div>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent bg={"gray.900"}>
                    <ModalHeader>Create Post</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form >
                            <div className="for-textarea">
                                <Textarea
                                    placeholder='Write post here'
                                    onChange={handleTextChange}
                                    value={postText}
                                />
                                <p
                                    style={{
                                        color: `${postText.length === 500 ? "red" : "#c5c5c5"}`,
                                        textAlign: "right",
                                        marginTop: "2px"
                                    }}
                                >{`${postText.length}/${Max_Text_Size}`}</p>
                                <div>
                                    <LuImagePlus size={"24px"} cursor={"pointer"}
                                        onClick={() => haandleTap.current.click()} />
                                    <input type="file"
                                        hidden ref={haandleTap}
                                        onChange={imageChangeHandle}
                                    />
                                </div>
                                <div className="img-preview" style={
                                    {
                                        marginTop: "16px",
                                        width: "400px",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        position: "relative"
                                    }
                                }>
                                    {
                                        imageUrl && (
                                            <img src={imageUrl ? imageUrl : ""} alt=""
                                                style={{
                                                    borderRadius: "6px",
                                                    width: "100%",

                                                }}
                                            />
                                        )
                                    }
                                    {
                                        imageUrl && (
                                            <div
                                                style={{
                                                    position: "absolute",
                                                    top: "10px",
                                                    right: "10px"
                                                }}
                                            ><ImCross cursor={"pointer"}
                                                onClick={() => {
                                                    setImageUrl("")
                                                }}
                                                /></div>
                                        )
                                    }
                                </div>
                            </div>
                        </form>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            isLoading={loading}
                            onClick={createPostHandler}
                            type='submit'
                            bg={useColorModeValue("gray.600", "gray.700")}
                            _hover={{
                                bg: useColorModeValue("gray.700", "gray.800"),
                            }} mr={0}>
                            Post
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreatePost
