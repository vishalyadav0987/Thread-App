import React, { useRef } from 'react'
import { Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Textarea, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { FaPlus } from "react-icons/fa";
import { LuImagePlus } from "react-icons/lu";


const CreatePost = () => {
    const haandleTap = useRef(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
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
                        <div className="for-textarea">
                            <Textarea placeholder='Write post here' />
                            <p
                                style={{
                                    color: "#c5c5c5",
                                    textAlign: "right",
                                    marginTop: "2px"
                                }}
                            >500/500</p>
                            <div>
                                <LuImagePlus size={"24px"} cursor={"pointer"}
                                    onClick={() => haandleTap.current.click()} />
                                <input type="file" hidden ref={haandleTap} />
                            </div>
                            <div className="img-preview" style={
                                {
                                    marginTop: "16px",
                                    width: "400px",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center"
                                }
                            }>
                                <img src="./post1.png" alt=""
                                    style={{
                                        borderRadius: "6px",
                                        width: "100%"
                                    }}
                                />
                                <div></div>
                            </div>
                        </div>

                    </ModalBody>

                    <ModalFooter>
                        <Button bg={useColorModeValue("gray.600", "gray.700")}
                            _hover={{
                                bg: useColorModeValue("gray.700", "gray.800"),
                            }} mr={0} onClick={onClose}>
                            Post
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default CreatePost
