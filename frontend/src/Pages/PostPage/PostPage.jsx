import React, { useEffect, useState } from 'react'
import './Post.css'
import { SlOptions } from "react-icons/sl";
import Actions from '../../Components/Actions/Action';
import Comments from '../../Components/Comments/Comments';
import Post from '../../Components/Post/Post';
import axios from "axios";
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { Avatar, Button, Spinner, useColorMode } from '@chakra-ui/react';
import { usePostContext } from '../../Context/PostContext';
import { formatDistanceToNow } from 'date-fns';

const PostPage = () => {
    const navigate = useNavigate();
    const { colorMode } = useColorMode()
    // const [post, setPost] = useState([]);
    const { posts, setPosts } = usePostContext();
    const [user, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loading2, setLoading2] = useState(false);
    const { pid } = useParams();
    const { username } = useParams();

    const currentPost = posts[0]

    useEffect(() => {
        const getPostDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/v1/post/${pid}`,
                    { withCredentials: true },
                );
                if (response.data.success) {
                    console.log(response.data.data);
                    // setPost(response.data.data);
                    setPosts([response.data.data])
                } else {
                    toast.error(response.data.message, {
                        className: 'custom-toast', // Custom class for styling)
                    });
                    console.log(response.data.data);

                }
            } catch (error) {
                toast.error(error.message, {
                    className: 'custom-toast', // Custom class for styling)
                });
                setPosts([]);
            } finally {
                setLoading(false);
            }
        }

        const fetchUserData = async () => {
            setLoading2(true);
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/v1/user/profile/${username}`,
                    { withCredentials: true }
                );
                if (!response.data.success) {
                    toast.error(response.data.message, {
                        className: 'custom-toast', // Custom class for styling)
                    });
                }
                setUser(response.data.data);
            } catch (error) {
                console.log("Error in fetchUserData Function ->", error.message);
            }
            finally {
                setLoading2(false);
            }
        }


        getPostDetails();
        fetchUserData()
    }, [pid, username, setPosts])

    if (!currentPost) return null;

    return (
        <>
            {
                loading ? <div style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: "35vh"
                }}>
                    <Spinner size='lg' />
                </div>
                    : (
                        <div className="single-post">
                            <div className="right-part-1">
                                <div className="post-header-1">
                                    <div>
                                        {
                                            user && (
                                                <div>
                                                    <Avatar
                                                        cursor={"pointer"}
                                                        mr={10}
                                                        onClick={(e) => {
                                                            e.preventDefault()
                                                            navigate(`/${user.username}`)
                                                        }}
                                                        src={user.profilePic || `${colorMode === "dark" ? "./white.png" : "./black-pro.png"}`} alt="" size={"md"} />
                                                </div>
                                            )
                                        }
                                        <div className='ok-1'
                                            onClick={(e) => {
                                                e.preventDefault()
                                                navigate(`/${user.username}`)
                                            }}
                                            style={{
                                                cursor: "pointer",
                                                marginLeft: "20px"
                                            }}>{user.username}</div>
                                        <div className='tag'>
                                            <img src='/verified.png' alt="" />
                                        </div>
                                    </div>
                                    <div>
                                        <span>{formatDistanceToNow(new Date(currentPost.createdAt))}</span>
                                        <span><SlOptions style={{ cursor: "pointer" }} /></span>
                                    </div>
                                </div>
                                <p className="post-heading">{currentPost && currentPost?.text}</p>
                                {
                                    currentPost.img && (
                                        <div className='user-post-img' style={{
                                            marginBottom: "0.8rem",
                                            width: "100%",
                                            height: "auto"
                                        }}>
                                            <img src={currentPost && currentPost.img} alt="" />
                                        </div>
                                    )
                                }

                                <div>
                                    <Actions post={currentPost} />
                                </div>
                            </div>
                            <div className="leave-comment-box">
                                <div>
                                    <span>🤌</span>
                                    <input type="text"
                                        placeholder='Get the app to like, reply and post' />
                                </div>
                                <Button border={"2px solid #232323"}>Get</Button>
                            </div>
                            {
                                currentPost && (
                                    currentPost.replies && currentPost.replies.length > 0 && (
                                        currentPost.replies.map((reply) => {
                                            return (
                                                <Comments
                                                    key={reply._id}
                                                    reply={reply}
                                                    user={user}
                                                    lastReply={
                                                        reply._id === currentPost.replies[currentPost.replies.length - 1]._id
                                                    }
                                                />
                                            )
                                        })
                                    )
                                )
                            }
                        </div>
                    )
            }
        </>
    )
}

export default PostPage
