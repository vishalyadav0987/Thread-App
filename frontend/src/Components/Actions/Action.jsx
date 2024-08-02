import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Textarea,
    useColorModeValue,
    useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { IoMdSend } from "react-icons/io";
import axios from 'axios';
import { useAuthContext } from '../../Context/AuthContext'
import { usePostContext } from '../../Context/PostContext'
import toast from 'react-hot-toast'
import { useNavigate } from "react-router-dom";

// const Actions = ({ post:post_}) => {
const Actions = ({ post }) => {
    const navigate = useNavigate()
    const { authUser } = useAuthContext()
    // const [liked, setLiked] = useState(post_.likes?.includes(authUser?._id));
    const [liked, setLiked] = useState(post.likes?.includes(authUser?._id));
    const { isOpen, onOpen, onClose } = useDisclosure()
    // const [post, setPost] = useState(post_)
    const { posts, setPosts } = usePostContext()
    const [replyText, setReplyText] = useState("");
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);

    const ReplyOnUserPost = async () => {
        if (!authUser) {
            toast.error("You must be logged in to reply to a post", {
                className: 'custom-toast', // Custom class for styling)
            })
            navigate('/auth');
            return;
        }
        if (loading) return;
        setLoading(true);
        try {
            const response = await axios.post(
                `https://thread-app-mc1i.onrender.com/api/v1/post/reply/${post?._id}`,
                { text: replyText },
                { headers: { "Content-Type": "application/json" }, withCredentials: true },
            );
            if (response.data.success) {
                // setPost({ ...post, replies: [...post.replies, response.data.reply] })
                const updatedPosts = posts.map((postFindInArray) => {
                    if (postFindInArray._id === post._id) {
                        return { ...postFindInArray, replies: [...postFindInArray.replies, response.data.reply] }
                    }
                    return postFindInArray;
                })
                setPosts(updatedPosts);
                toast.success(response.data.message, {
                    className: 'custom-toast', // Custom class for styling)
                })
                console.log(response.data.data)
                setReplyText("")
                onClose();
                return;
            }
            else {
                return toast.error(response.data.message, {
                    className: 'custom-toast', // Custom class for styling)
                })
            }
        } catch (error) {
            console.log("Error in ReplyOnUserPost->", error.message)
            toast.error("An error occurred while replying to the post", {
                className: 'custom-toast' // Custom class for styling
            });
        }
        finally {
            setLoading(false);
        }
    }

    const handleLikeUserPost = async () => {
        if (!authUser) {
            toast.error("You must be logged in to like to a post", {
                className: 'custom-toast', // Custom class for styling)
            });
            navigate('/auth');
            return;
        }
        if (loading2) return;
        setLoading2(true);
        try {
            const response = await axios.post(
                `https://thread-app-mc1i.onrender.com/api/v1/post/like/${post?._id}`,
                {},
                { headers: { "Content-Type": "application/json" }, withCredentials: true },
            );
            if (response.data.success) {
                if (!liked) {
                    // add the id of authuser:login user to likes array
                    // setPost({ ...post, likes: [...post.likes, authUser._id] })
                    const updatedPosts = posts.map((postFindInArray) => {
                        if (postFindInArray._id === post._id) {
                            return { ...postFindInArray, likes: [...postFindInArray.likes, authUser?._id] }
                        }
                        return postFindInArray;
                    })
                    setPosts(updatedPosts);
                    toast.success(response.data.message, {
                        className: 'custom-toast', // Custom class for styling)
                    });

                }
                else {
                    // remove id of login user from likes array if liked the post
                    // setPost({ ...post, likes: post.likes.filter(id => id !== authUser._id) })
                    const updatedPosts = posts.map((postFindInArray) => {
                        if (postFindInArray._id === post?._id) {
                            return { ...postFindInArray, likes: postFindInArray.likes.filter((userId) => userId !== authUser?._id) }
                        }
                        return postFindInArray;
                    })
                    setPosts(updatedPosts);
                    toast.success(response.data.message, {
                        className: 'custom-toast', // Custom class for styling)
                    });
                }

                setLiked(!liked);
            }
            else {
                return toast.error(response.data.message, {
                    className: 'custom-toast', // Custom class for styling)
                })
            }

        } catch (error) {
            console.log("Error in handleLikeUserPost->", error.message)
            toast.error("An error occurred while replying to the post", {
                className: 'custom-toast' // Custom class for styling
            });
        }
        finally {
            setLoading2(false);
        }
    }

    return (
        <Flex flexDirection='column'>
            <Flex gap={3} my={2} onClick={(e) => e.preventDefault()}>
                <svg
                    style={{ cursor: "pointer" }}
                    aria-label='Like'
                    color={liked ? "rgb(237, 73, 86)" : ""}
                    fill={liked ? "rgb(237, 73, 86)" : "transparent"}
                    height='19'
                    role='img'
                    viewBox='0 0 24 22'
                    width='20'
                    onClick={handleLikeUserPost}
                >
                    <path
                        d='M1 7.66c0 4.575 3.899 9.086 9.987 12.934.338.203.74.406 1.013.406.283 0 .686-.203 1.013-.406C19.1 16.746 23 12.234 23 7.66 23 3.736 20.245 1 16.672 1 14.603 1 12.98 1.94 12 3.352 11.042 1.952 9.408 1 7.328 1 3.766 1 1 3.736 1 7.66Z'
                        stroke='currentColor'
                        strokeWidth='2'
                    ></path>
                </svg>

                <svg
                    onClick={onOpen}
                    style={{ cursor: "pointer" }}
                    aria-label='Comment'
                    color=''
                    fill=''
                    height='20'
                    role='img'
                    viewBox='0 0 24 24'
                    width='20'
                >
                    <title>Comment</title>
                    <path
                        d='M20.656 17.008a9.993 9.993 0 1 0-3.59 3.615L22 22Z'
                        fill='none'
                        stroke='currentColor'
                        strokeLinejoin='round'
                        strokeWidth='2'
                    ></path>
                </svg>

                <RepostSVG />
                <ShareSVG />
            </Flex>
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent bg={"gray.900"} maxW={{ base: '90%', sm: '80%', md: '60%', lg: '30%' }} >
                    <ModalHeader>Reply</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <div className="for-textarea">
                            <Textarea
                                placeholder='Write reply here'
                                onChange={(e) => setReplyText(e.target.value)}
                                value={replyText}
                            />
                            <p
                                style={{
                                    // color: `${postText.length === 500 ? "red" : "#c5c5c5"}`,
                                    color: `${"#c5c5c5"}`,
                                    textAlign: "right",
                                    marginTop: "2px"
                                }}
                            >100/100</p>

                        </div>
                    </ModalBody>

                    <ModalFooter>
                        <Button
                            onClick={ReplyOnUserPost}
                            isLoading={loading}
                            bg={useColorModeValue("gray.600", "gray.700")}
                            _hover={{
                                bg: useColorModeValue("gray.700", "gray.800"),
                            }}
                            size={"sm"}>
                            <IoMdSend size={16} />
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <div className="bottom-part">
                <div className='follower-info'>
                    <div style={{ color: "#4d4d4d" }}>{post && post.likes?.length} likes</div>
                    <span></span>
                    <span>{post && post.replies?.length} replies</span>
                </div>
            </div>
        </Flex>
    );
};

export default Actions;

const RepostSVG = () => {
    return (
        <svg
            style={{ cursor: "pointer" }}
            aria-label='Repost'
            color='currentColor'
            fill='currentColor'
            height='20'
            role='img'
            viewBox='0 0 24 24'
            width='20'
        >
            <title>Repost</title>
            <path
                fill=''
                d='M19.998 9.497a1 1 0 0 0-1 1v4.228a3.274 3.274 0 0 1-3.27 3.27h-5.313l1.791-1.787a1 1 0 0 0-1.412-1.416L7.29 18.287a1.004 1.004 0 0 0-.294.707v.001c0 .023.012.042.013.065a.923.923 0 0 0 .281.643l3.502 3.504a1 1 0 0 0 1.414-1.414l-1.797-1.798h5.318a5.276 5.276 0 0 0 5.27-5.27v-4.228a1 1 0 0 0-1-1Zm-6.41-3.496-1.795 1.795a1 1 0 1 0 1.414 1.414l3.5-3.5a1.003 1.003 0 0 0 0-1.417l-3.5-3.5a1 1 0 0 0-1.414 1.414l1.794 1.794H8.27A5.277 5.277 0 0 0 3 9.271V13.5a1 1 0 0 0 2 0V9.271a3.275 3.275 0 0 1 3.271-3.27Z'
            ></path>
        </svg>
    );
};

const ShareSVG = () => {
    return (
        <svg
            style={{ cursor: "pointer" }}
            aria-label='Share'
            color=''
            fill='rgb(243, 245, 247)'
            height='20'
            role='img'
            viewBox='0 0 24 24'
            width='20'
        >
            <title>Share</title>
            <line
                fill='none'
                stroke='currentColor'
                strokeLinejoin='round'
                strokeWidth='2'
                x1='22'
                x2='9.218'
                y1='3'
                y2='10.083'
            ></line>
            <polygon
                fill='none'
                points='11.698 20.334 22 3.001 2 3.001 9.218 10.084 11.698 20.334'
                stroke='currentColor'
                strokeLinejoin='round'
                strokeWidth='2'
            ></polygon>
        </svg>
    );
};