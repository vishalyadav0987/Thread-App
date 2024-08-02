import React, { useEffect, useState } from 'react'
import { SlOptions } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import Actions from '../Actions/Action';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Avatar, Image, Text, useColorMode } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns'
import '../UserPost/UserPost.css'
import { useAuthContext } from '../../Context/AuthContext';
import { FaRegTrashAlt } from "react-icons/fa";
import { usePostContext } from '../../Context/PostContext'


const Post = ({ post }) => {
    const { authUser } = useAuthContext()
    const navigate = useNavigate()
    const { colorMode } = useColorMode();
    const [feedUser, setFeedUser] = useState(null);
    const { posts, setPosts } = usePostContext()
    const { text: postTitle, img: postImg, replies, postedBy, createdAt } = post;
    useEffect(() => {
        const getProfileOfPostedUser = async () => {
            try {
                const response = await axios.get(
                    `https://thread-app-mc1i.onrender.com/api/v1/user/profile/${postedBy}`,
                    { withCredentials: true }
                );
                if (response.data.success) {
                    // console.log(response.data.data)
                    setFeedUser(response.data.data)
                } else {
                    toast.error(response.data.message, {
                        className: 'custom-toast', // Custom class for styling)
                    })
                }
            } catch (error) {
                console.log("Error in getProfileOfPostedUser->", error.message)
            }
        }
        getProfileOfPostedUser();
    }, [postedBy]);

    const handleDeletePost = async (postID) => {
        if (!window.confirm("Are you sure you want to delete this post.")) return;
        try {
            const response = await axios.delete(
                `https://thread-app-mc1i.onrender.com/api/v1/post/${postID}`,
                { withCredentials: true }
            );
            if (response.data.success) {
                // console.log(response.data.data)
                toast.success(response.data.message, {
                    className: 'custom-toast', // Custom class for styling)
                })
                setPosts(posts.filter((p) => p._id !== post._id))
            } else {
                toast.error(response.data.message, {
                    className: 'custom-toast', // Custom class for styling)
                })
            }
        } catch (error) {
            console.log("Error in handleDeletePost->", error.message)
        }
    }

    if (!feedUser) return null;
    return (
        <>
            <Link to={`/${feedUser.username}/post/${post._id}`} className="user-post">
                <div className="left-part">
                    <div>
                        {
                            feedUser && (
                                <Avatar
                                size={{base:'sm', md: 'md',lg:'md'}}
                                    cursor={"pointer"}
                                    onClick={(e) => {
                                        e.preventDefault()
                                        navigate(`/${feedUser.username}`)
                                    }}
                                    src={feedUser.profilePic || `${colorMode === "dark" ? "./white.png" : "./black-pro.png"}`} alt="" />
                            )
                        }
                    </div>
                    <div></div>
                    <div>
                        {
                            replies?.length === 0 && (<Text textAlign={"center"}>😔</Text>)
                        }
                        {
                            replies[0] && (
                                <img src={replies[0]?.userProfilePic || `${colorMode === "dark" ? "./white.png" : "./black-pro.png"}`} alt="" style={{
                                    borderRadius: "50%",
                                }} />
                            )
                        }
                        {
                            replies[1] && (
                                <img src={replies[1]?.userProfilePic || `${colorMode === "dark" ? "./white.png" : "./black-pro.png"}`} alt="" style={{
                                    borderRadius: "50%",
                                }} />
                            )
                        }
                        {
                            replies[2] && (
                                <img src={replies[2]?.userProfilePic || `${colorMode === "dark" ? "./white.png" : "./black-pro.png"}`} alt="" style={{
                                    borderRadius: "50%",
                                }} />
                            )
                        }
                    </div>
                </div>
                <div className="right-part" style={{
                    width: "100%"
                }}>
                    <div className="post-header">
                        <div>
                            <div onClick={(e) => {
                                e.preventDefault()
                                navigate(`/${feedUser.username}`)
                            }}>{feedUser && feedUser.username}</div>
                            <div><img src='verified.png' alt="" /></div>
                        </div>
                        <div>
                            <span>{formatDistanceToNow(new Date(createdAt))} ago</span>
                            {
                                authUser?._id === post.postedBy
                                    ? <span><FaRegTrashAlt
                                        onClick={(e) => {
                                            e.preventDefault();
                                            handleDeletePost(post._id)
                                        }}
                                        style={{ cursor: "pointer" }} /></span>
                                    : <span><SlOptions style={{ cursor: "pointer" }} /></span>
                            }
                        </div>
                    </div>
                    <p className="post-heading">{post && postTitle}</p>
                    {
                        postImg && (
                            <div className='user-post-img' style={{ marginBottom: "0.8rem" }}>
                                <Image src={postImg} alt="" />
                            </div>
                        )
                    }
                    <Actions post={post} />
                </div>
            </Link>
        </>
    )
}

export default Post
