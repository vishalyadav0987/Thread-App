import  { useState } from 'react'
import { useMessageContext } from '../Context/MessageContext';
import { useAuthContext } from '../Context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';

const useConversationWithUserSearch = () => {
    const { authUser } = useAuthContext()
    const { conversations,
        setConversations,
        // selectedConversation,
        setSelectedConversation
    } = useMessageContext();
    const [loading2, setLoading2] = useState(false);
    const [searchValue, setSearchValue] = useState("");


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
                `https://thread-app-mc1i.onrender.com/api/v1/user/profile/${searchValue}`,
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

    return { handleSearchConversationUser, searchValue, setSearchValue, loading2 }
}

export default useConversationWithUserSearch
