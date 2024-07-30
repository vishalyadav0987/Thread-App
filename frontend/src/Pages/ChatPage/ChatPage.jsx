import { Search2Icon } from '@chakra-ui/icons'
import { Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React from 'react'
import { LuMessageCircle } from 'react-icons/lu'
import Conversations from '../../Components/Conversations/Conversations'
import MessageContainer from '../../Components/MessageContainer/MessageContainer'

const ChatPage = () => {
  return (
    <>
      <div className="chat-container" style={{
        minWidth: "750px",
        height: "400px",
        transform: "translate(-75px)",
        display: "flex",
        marginTop: "40px",
        gap: "6px",
        border: "1px solid #212728",
      }}>
        <div style={{
          flex: "0.4",
        }}>
          <div className="searchBar" style={{
            display: "flex",
            alignItems: "center",
            gap: "4px",
          }}>
            <InputGroup>
              <Input placeholder='medium size' size='md' focusBorderColor='#ffed' />
              <InputRightElement>
                <Search2Icon cursor={"pointer"} />
              </InputRightElement>
            </InputGroup>
          </div>
          <div className="conversation" style={{
            marginTop: "0.6rem",
            display: "flex",
            flexDirection: "column",
            gap: "0rem",
            width: "100%",
            height: "88%",
            overflowY: "scroll"
          }}>
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
            <Conversations />
          </div>
        </div>
        <div
          style={{
            background: "#212728",
            flex: "0.6",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            borderRadius: "0 6px 6px 0",
            position: "relative",
            overflow: "hidden",
            height: "100%"
          }}
        >
          {
            false && (
              <>
                <div style={{
                  width: "100&",
                  height: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "10px"
                }}>
                  <p style={{
                    fontSize: "20px",
                    fontFamily: "sans-serif"
                  }}>
                    Welcome 🤌 <b>Yadav0987</b> 🤖 <br />
                    Select to start to messageing
                  </p>
                  <span><LuMessageCircle size={50} /></span>
                </div>
              </>
            )
          }
          <MessageContainer />
        </div>
      </div>
    </>
  )
}

export default ChatPage
