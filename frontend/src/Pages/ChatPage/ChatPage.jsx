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

const ChatPage = () => {
  const { authUser } = useAuthContext()
  const { conversations,
    setConversations,
    selectedConversation,
    setSelectedConversation
  } = useMessageContext();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [searchValue, setSearchValue] = useState("");


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


  const handleSearchConversationUser = async () => {
    setLoading2(true);
    if (!searchValue) {
      toast.error("You can search by empty field", {
        className: 'custom-toast', // Custom class for styling)
      });
      setLoading2(false)
      return;
    }
    try {
      const response = await axios.get(
        `http://localhost:3000/api/v1/user/profile/${searchValue}`,
        { withCredentials: true }
      );
      if (!response.data.success) {
        toast.error(response.data.message, {
          className: 'custom-toast', // Custom class for styling)
        });
      }
      const messagingYourself = response.data.data?._id === authUser?._id;
      if (messagingYourself) {
        toast.error("you can't message yourself", {
          className: 'custom-toast', // Custom class for styling)
        });
        return;
      }

      const conversationUserExist = conversations.find((conversation) =>
        conversation.participants[0]?._id === response.data.data?._id
      );
      if (conversationUserExist) {
        setSelectedConversation({
          _id: conversationUserExist?._id,
          username: response.data.data.username,
          userId: response.data.data?._id,
          userProfilePic: response.data.data.profilePic,
        });
        return;
      }
      const mockConversation = {
        mock: true,
        lastMessage: {
          text: "",
          senderId: "",
        },
        _id: Date.now(),
        participants: [
          {
            _id: response.data.data?._id,
            username: response.data.data.username,
            profilePic: response.data.data.profilePic,
          },
        ],
      };
      setConversations((prevConvs) => [...prevConvs, mockConversation]);
    } catch (error) {
      console.log("Error in handleSearchConversationUser function fronted->", error.message)
      toast.error(error.message, {
        className: 'custom-toast', // Custom class for styling)
      });
    } finally {
      setLoading2(false);
    }
  }
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
                />
              ))}
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
