import React, { useState } from 'react'
import './UserHeader.css';
import { Link } from 'react-router-dom'
import { FaInstagram } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
} from '@chakra-ui/react';
import toast from 'react-hot-toast';
import { useAuthContext } from '../../Context/AuthContext'
import axios from 'axios'

const UserHeader = ({ user }) => {
    const { authUser } = useAuthContext() //logged in user
    const [loading, setLoading] = useState(false)
    const linkCopyHandler = () => {
        // user id url
        const currentURL = window.location.href;
        // console.log(window.location,window.location.href);
        navigator.clipboard.writeText(currentURL).then(() => {
            // toast.success("URL copied to clipboard.")
            toast.success("Profile URL copied.", {
                className: 'custom-toast', // Custom class for styling)
            })
        })
    }
    const [isFollowing, setIsFollowing] = useState(user.followers.includes(authUser._id));
    console.log(isFollowing, user._id);
    const handleFollowUnFollow = async () => {
        if (!authUser) {
            toast.error('Please Login to follow the user', {
                className: 'custom-toast', // Custom class for styling)
            });
        }
        setLoading(true);
        try {
            const response = await axios.post(
                `http://localhost:3000/api/v1/user/follow/${user._id}`,
                {},
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );
            console.log(response.data)
            if (response.data.success) {
                if (isFollowing) {
                    toast.success(`Unfollow ${user.name}`, {
                        className: 'custom-toast', // Custom class for styling)
                    });
                    user.followers.pop();
                }
                else {
                    toast.success(`Follow ${user.name}`, {
                        className: 'custom-toast', // Custom class for styling)
                    });
                    user.followers.push(authUser._id)
                }
                setIsFollowing(!isFollowing);
            }
            else {
                toast.error(response.data.message, {
                    className: 'custom-toast', // Custom class for styling)
                });
            }
        } catch (error) {
            console.log("Error in handleFollowUnFollow->", error.message);
        }
        finally {
            setLoading(false);
        }
    }
    return (
        <>
            <div className="user-header">
                <div className="top-part">
                    <div className="name-info">
                        <span className='name-text'>{user && user.name}</span>
                        <div className="username-container">
                            <span className='username'>
                                {user && user.username}
                            </span>
                            <span className='thread-net-text'>
                                threads.net
                            </span>
                        </div>
                    </div>
                    <div className="user-img">
                        <img src={(user && user.profilePic) || "./profile.png"} alt="" style={
                            {
                                width: "100%",
                                borderRadius: "50%"
                            }
                        } />
                    </div>
                </div>
                <div className="middle-part user-bio">
                    {user && user.bio}
                </div>
                <div>
                    {
                        authUser._id === user._id && (
                            <Link to={'/update'}>
                                <Button size={"sm"}>Update profile</Button>
                            </Link>
                        )
                    }
                    {
                        authUser._id !== user._id && (
                            <Button size={"sm"}
                                onClick={handleFollowUnFollow}
                                isLoading={loading}
                            >
                                {
                                    isFollowing
                                        ? "Unfollow"
                                        : "Follow"
                                }
                            </Button>
                        )
                    }
                </div>
                <div className="bottom-part">
                    <div className='follower-info'>
                        <span>{user && user.followers.length} followers</span>
                        <span></span>
                        <Link to={'/'}>instagram.com</Link>
                    </div>
                    <div className="options">
                        <span><FaInstagram /></span>

                        <Menu>
                            <MenuButton className='menu-icon'>
                                <SlOptions
                                    style={{
                                        fontSize: "1.5rem",
                                        padding: "3px"
                                    }}
                                />
                            </MenuButton>
                            <MenuList
                                bg={"gray.dark"}>
                                <MenuItem
                                    onClick={linkCopyHandler}
                                    bg={"gray.dark"}
                                    fontSize={"medium"}
                                >Copy link</MenuItem>
                            </MenuList>
                        </Menu>
                    </div>
                </div>
                <div className="slide-thread-replies">
                    <div className='active-slide'>Threads</div>
                    <div className='inactive-slide'>Replies</div>
                </div>
            </div>
        </>
    )
}

export default UserHeader
