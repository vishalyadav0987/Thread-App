import { Search2Icon } from '@chakra-ui/icons'
import { Box, Flex, Input, InputGroup, InputRightElement, Skeleton, SkeletonCircle, Spinner } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react'
import { LuMessageCircle } from 'react-icons/lu'
import Conversations from '../../Components/Conversations/Conversations'
import MessageContainer from '../../Components/MessageContainer/MessageContainer'
import { useMessageContext } from '../../Context/MessageContext'
import axios from 'axios'
import toast from 'react-hot-toast';
import { useAuthContext } from '../../Context/AuthContext'
import useConversationWithUserSearch from '../../CustomHook/useConversationWithUserSearch'
import { useSocketContext } from '../../Context/SocketContext'

const ChatPage = () => {
  const { authUser } = useAuthContext()
  const { conversations,
    setConversations,
    selectedConversation,
    // setSelectedConversation
  } = useMessageContext();
  const [loading, setLoading] = useState(false);
  const { handleSearchConversationUser,
    searchValue,
    setSearchValue,
    loading2
  } = useConversationWithUserSearch();
  const { socket, onlineUsers } = useSocketContext();

  useEffect(() => {
    socket?.on("messagesSeen", ({ conversationId }) => {
      setConversations((prev) => {
        const updatedConversations = prev.map((conversation) => {
          if (conversation._id === conversationId) {
            return {
              ...conversation,
              lastMessage: {
                ...conversation.lastMessage,
                seen: true,
              }
            }
          }
          return conversation;
        })
        return updatedConversations;
      })
    })
  }, [socket, setConversations])

  useEffect(() => {
    const getConversation = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          'http://localhost:3000/api/v1/message/conversation',
          { withCredentials: true },
        );

        if (response.data.success) {
          setConversations(response.data.data);
          // console.log(response.data.data)
        }
        else {
          toast.error(response.data.message, {
            className: 'custom-toast', // Custom class for styling)
          });
        }
      } catch (error) {
        console.log("Error in getConverstion function fronted->", error.message)
        toast.error(error.message, {
          className: 'custom-toast', // Custom class for styling)
        });
      } finally {
        setLoading(false);
      }
    }
    getConversation();
  }, [setConversations]);



  return (
    <>
      <div className="chat-container" style={{
        minWidth: "750px",
        height: "400px",
        transform: "translate(-75px)",
        display: "flex",
        marginTop: "40px",
        gap: "6px",
        // border: "1px solid #212728",
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
              <Input
                placeholder='medium size'
                size='md'
                focusBorderColor='#ffed'
                onChange={(e) => { setSearchValue(e.target.value) }}
                value={searchValue}
              />
              <InputRightElement>
                {
                  loading2
                    ? <Spinner size={"xs"} />
                    : <Search2Icon cursor={"pointer"}
                      onClick={handleSearchConversationUser}
                    />
                }
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
            {loading &&
              [0, 1, 2, 3, 4].map((_, i) => (
                <Flex key={i} gap={4} alignItems={"center"} p={"1"} borderRadius={"md"}>
                  <Box>
                    <SkeletonCircle size={"10"} />
                  </Box>
                  <Flex w={"full"} flexDirection={"column"} gap={3}>
                    <Skeleton h={"10px"} w={"80px"} />
                    <Skeleton h={"8px"} w={"90%"} />
                  </Flex>
                </Flex>
              ))}

            {!loading &&
              conversations.map((conversation) => (
                <Conversations
                  key={conversation?._id}
                  conversation={conversation}
                  isOnline={onlineUsers?.includes(conversation.participants[0]._id)}
                />
              ))}
          </div>
        </div>
        <div
          style={{
            background: "#1e1e1e",
            flex: "0.6",
            boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
            borderRadius: "0 6px 6px 0",
            position: "relative",
            overflow: "hidden",
            height: "100%"
          }}
        >
          {
            !selectedConversation._id && (
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
                    Welcome 🤌 <b>{authUser?.username}</b> 🤖 <br />
                    Select to start to messageing
                  </p>
                  <span><LuMessageCircle size={50} /></span>
                </div>
              </>
            )
          }
          {
            selectedConversation?._id && <MessageContainer />
          }
        </div>
      </div>
    </>
  )
}

export default ChatPage
