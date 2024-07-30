import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React from 'react'
import { LuSendHorizonal } from 'react-icons/lu'

const MessageInput = () => {
    return (
        <>
            <div style={{
                position: "absolute",
                bottom: "0px",
                width: "100%",
                background: "#1e1e1e",
                padding: "0.5rem 0.4rem"
            }}>
                <InputGroup>
                    <Input type='text' placeholder='Type message here...' focusBorderColor='#ffef' />
                    <InputRightElement>
                        <LuSendHorizonal cursor={"pointer"} size={"22px"} />
                    </InputRightElement>
                </InputGroup>
            </div>
        </>
    )
}

export default MessageInput
