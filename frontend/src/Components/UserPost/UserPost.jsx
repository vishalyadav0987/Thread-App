import React, { useState } from 'react'
import './UserPost.css'
import { SlOptions } from "react-icons/sl";
import { Link } from "react-router-dom";
import Actions from '../Actions/Action';


const UserPost = ({ postImg, likes, replies, postTitle }) => {
    const [liked, setLiked] = useState(false);

    return (
        <>
            <Link to={`/vishalyadav/post/1`} className="user-post">
                <div className="left-part">
                    <div>
                        <img src='logo192.png' alt="" />
                    </div>
                    <div></div>
                    <div>
                        <img src='logo192.png' alt="" />
                        <img src='logo192.png' alt="" />
                        <img src='logo192.png' alt="" />
                    </div>
                </div>
                <div className="right-part">
                    <div className="post-header">
                        <div>
                            <div>vishalyadav0987</div>
                            <div><img src='verified.png' alt="" /></div>
                        </div>
                        <div>
                            <span>1d</span>
                            <span><SlOptions style={{ cursor: "pointer" }} /></span>
                        </div>
                    </div>
                    <p className="post-heading">{postTitle}</p>
                    {
                        postImg && (
                            <div className='user-post-img' style={{ marginBottom: "0.8rem" }}>
                                <img src={postImg} alt="" />
                            </div>
                        )
                    }
                    <Actions liked={liked} setLiked={setLiked}/>
                    <div className="bottom-part">
                        <div className='follower-info'>
                            <div style={{ color: "#4d4d4d" }}>{likes} likes</div>
                            <span></span>
                            <span>{replies} replies</span>
                        </div>
                    </div>
                </div>
            </Link>
        </>
    )
}

export default UserPost
