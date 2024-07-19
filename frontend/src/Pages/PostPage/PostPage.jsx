import React, { useState } from 'react'
import './Post.css'
import { SlOptions } from "react-icons/sl";
import Actions from '../../Components/Actions/Action';
import Comments from '../../Components/Comments/Comments';

const PostPage = () => {
    const [liked, setLiked] = useState(false);
    return (
        <>
            <div className="single-post">
                <div className="right-part-1">
                    <div className="post-header-1">
                        <div>
                            <div>
                                <img src="/logo192.png" alt="" />
                            </div>
                            <div className='ok-1'>vishalyadav0987</div>
                            <div className='tag'>
                                <img src='/verified.png' alt="" />
                            </div>
                        </div>
                        <div>
                            <span>1d</span>
                            <span><SlOptions style={{ cursor: "pointer" }} /></span>
                        </div>
                    </div>
                    <p className="post-heading">{"This is my first post"}</p>
                    {
                        // "k" && (
                        <div className='user-post-img' style={{
                            marginBottom: "0.8rem",
                            width: "100%",
                            height: "auto"
                        }}>
                            <img src={'/post1.png'} alt="" />
                        </div>
                        // )
                    }
                    <Actions liked={liked} setLiked={setLiked} />
                    <div className="bottom-part">
                        <div className='follower-info'>
                            <div style={{ color: "#4d4d4d" }}>{5040 + (liked ? 1 : 0)} likes</div>
                            <span></span>
                            <span>{"120"} replies</span>
                        </div>
                    </div>
                </div>
                <div className="leave-comment-box">
                    <div>
                        <span>🤌</span>
                        <input type="text"
                            placeholder='Get the app to like, reply and post' />
                    </div>
                    <button>Get</button>
                </div>
                <Comments 
                comment={"This is my first comment"} 
                likes={134} 
                createdAt="25d"
                username={"Vishalyadav"}
                userAvatar={'https://bit.ly/kent-c-dodds'}
                />
                <Comments 
                comment={"Very good 🤖"} 
                likes={80}
                createdAt="2d"
                username={"Aditya09"}
                userAvatar={'https://bit.ly/dan-abramov'}
                />
                <Comments 
                comment={"Excellent ⭐"} 
                likes={500}
                createdAt="6d"
                username={"Vedant1712"}
                userAvatar={'https://bit.ly/prosper-baba'}
                />
                <Comments 
                comment={"Picture is very nice 💓"} 
                likes={154}
                createdAt="1d"
                username={"Piyush2004"}
                userAvatar={'https://bit.ly/code-beast'}
                />
            </div>
        </>
    )
}

export default PostPage
