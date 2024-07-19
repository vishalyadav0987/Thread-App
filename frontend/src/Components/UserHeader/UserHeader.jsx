import React from 'react'
import './UserHeader.css';
import { Link } from 'react-router-dom'
import { FaInstagram } from "react-icons/fa";
import { SlOptions } from "react-icons/sl";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
} from '@chakra-ui/react';
import toast from 'react-hot-toast';

const UserHeader = () => {
    const linkCopyHandler = () => {
        // user id url
        const currentURL = window.location.href;
        // console.log(window.location,window.location.href);
        navigator.clipboard.writeText(currentURL).then(() => {
            // toast.success("URL copied to clipboard.")
            toast.success("Profile URL copied.")
        })
    }
    return (
        <>
            <div className="user-header">
                <div className="top-part">
                    <div className="name-info">
                        <span className='name-text'>Vishal Yadav</span>
                        <div className="username-container">
                            <span className='username'>
                                vishalyadav0987
                            </span>
                            <span className='thread-net-text'>
                                threads.net
                            </span>
                        </div>
                    </div>
                    <div className="user-img">
                        <img src='logo192.png' alt="" />
                    </div>
                </div>
                <div className="middle-part user-bio">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                </div>
                <div className="bottom-part">
                    <div className='follower-info'>
                        <span>3.2K followers</span>
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
