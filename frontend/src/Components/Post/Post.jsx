import React, { useEffect, useState } from 'react'
import { SlOptions } from "react-icons/sl";
import { Link, useNavigate } from "react-router-dom";
import Actions from '../Actions/Action';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Text, useColorMode } from '@chakra-ui/react';
import { formatDistanceToNow } from 'date-fns'
import '../UserPost/UserPost.css'


const Post = ({ post }) => {
    const navigate = useNavigate()
    const { colorMode } = useColorMode();
    const [liked, setLiked] = useState(false);
    const [feedUser, setFeedUser] = useState(null);
    const { text: postTitle, img: postImg, likes, replies, postedBy,createdAt } = post;
    useEffect(() => {
        const getProfileOfPostedUser = async () => {
            try {
                const response = await axios.get(
                    `http://localhost:3000/api/v1/user/profile/${postedBy}`,
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

    if (!feedUser) return null;
    return (
        <>
            <Link to={`/${feedUser.username}/post/${post._id}`} className="user-post">
                <div className="left-part">
                    <div>
                        {
                            feedUser && (
                                <img
                                    onClick={(e) => {
                                        e.preventDefault()
                                        navigate(`/${feedUser.username}`)
                                    }}
                                    src={feedUser.profilePic || `${colorMode === "dark" ? "./white.png" : "./black-pro.png"}`} alt="" style={{
                                        borderRadius: "50%",
                                        width: "100%"
                                    }} />
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
                <div className="right-part">
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
                            <span><SlOptions style={{ cursor: "pointer" }} /></span>
                        </div>
                    </div>
                    <p className="post-heading">{post && postTitle}</p>
                    {
                        postImg && (
                            <div className='user-post-img' style={{ marginBottom: "0.8rem" }}>
                                <img src={postImg} alt="" />
                            </div>
                        )
                    }
                    <Actions liked={liked} setLiked={setLiked} />
                    <div className="bottom-part">
                        <div className='follower-info'>
                            <div style={{ color: "#4d4d4d" }}>{post && likes?.length} likes</div>
                            <span></span>
                            <span>{post && replies?.length} replies</span>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default Post
