import React from 'react'
import { SlOptions } from "react-icons/sl";
import { useNavigate } from 'react-router-dom';
import { Avatar, useColorMode } from '@chakra-ui/react';


const Comments = ({ reply, lastReply }) => {
    const navigate = useNavigate();
    const { colorMode } = useColorMode()

    return (
        <div className='comment-section'>
            <div className="right-part-1" style={{ padding: "1rem" }}>
                <div className="post-header-1">
                    <div>
                        {
                            reply && (
                                <div>
                                    <Avatar
                                        cursor={"pointer"}
                                        mr={10}
                                        onClick={(e) => {
                                            e.preventDefault()
                                            navigate(`/${reply.username}`)
                                        }}
                                        src={reply.userProfilePic || `${colorMode === "dark" ? "./white.png" : "./black-pro.png"}`} alt="" size={{ base: 'sm', md: 'md', lg: 'md' }}/>
                                </div>
                            )
                        }
                        <div className='ok-1'
                            onClick={(e) => {
                                e.preventDefault()
                                navigate(`/${reply.username}`)
                            }}
                            style={{
                                marginLeft: "20px",
                                cursor: "pointer"
                            }}>{reply && reply.username}</div>
                    </div>
                    <div>
                        <span>{"1d"}</span>
                        <span><SlOptions style={{ cursor: "pointer" }} /></span>
                    </div>
                </div>
                <p className="post-heading" style={{ paddingLeft: "60px", margin: "0" }}>{reply && reply.text}</p>
                <div style={{ paddingLeft: "40px" }}>
                    {/* <Actions post={""} /> */}
                </div>
            </div>
            {
                !lastReply && <div className="divider"></div>
            }
        </div>
    )
}

export default Comments
