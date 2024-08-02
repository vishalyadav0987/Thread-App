import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from '@chakra-ui/react'
import React, { useState } from 'react'
import useLogoutHook from '../../CustomHook/useLogoutHook';
import axios from 'axios'
import toast from 'react-hot-toast';

const FreezAccount = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { handleOnLogout } = useLogoutHook();
    const [loading, setLoading] = useState(false)
    const handleFreezAccount = async () => {
        setLoading(true)
        try {
            const response = await axios.put(
                'https://thread-app-mc1i.onrender.com/api/v1/user/freez',
                {},
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );
            if (response.data.success) {
                await handleOnLogout();
                toast.success(response.data.message, {
                    className: 'custom-toast', // Custom class for styling)
                });
                onClose()
            }
            else {
                toast.error(response.data.message, {
                    className: 'custom-toast', // Custom class for styling)
                });
            }
        } catch (error) {
            console.log("Error in FreezAccount frontend function ->", error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div className='warning-section'
                style={{ width: "90%", margin: "20px 10px", padding: "0 20px" }}>
                <h1 style={{
                    fontWeight: "700",
                    fontSize: "2rem",
                    textAlign: "center"
                }}>Point to noticed that</h1>
                <h3 style={{
                    color: "red",
                    fontWeight: "600",
                    marginTop: "12px"
                }}>Warning: Freezing Your Account 💀</h3>
                <ul style={{
                    marginTop: "12px"
                }}>
                    <li><b>Chat Disabled</b>: You will not be able to chat with users</li>
                    <li><b>Post Interactions Halted</b>: Liking, commenting, and uploading posts will be disabled</li>
                    <li><b>Account Visibility Restricted</b>: Your account will not be visible in searches.</li>
                    <li><b>Access to Account Details Blocked</b>: You won't be able to view your account details.</li>
                </ul>
                <span style={{
                    color: "green",
                    marginTop: "14px",
                    display: "inline-block",
                    fontWeight: "600"
                }}><b>Note</b>: All functionalities will be restored upon re-login.</span> <br />
                <Button px={5} mt={4}
                    onClick={onOpen}
                    cursor={"pointer"}
                    bg={"red.500"} _hover={
                        { bg: "red.600" }
                    }>Freez</Button>
            </div>
            <Modal onClose={onClose} isOpen={isOpen} isCentered >
                <ModalOverlay />
                <ModalContent maxW={{ base: '90%', sm: '80%', md: '60%', lg: '30%' }}>
                    <ModalHeader>You Want To Freez Account</ModalHeader>
                    <ModalBody>
                        Rhende de bhai moj kar ❤️
                    </ModalBody>
                    <ModalFooter>
                        <Button mx={4} onClick={handleFreezAccount} isLoading={loading}>Ok</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}

export default FreezAccount
