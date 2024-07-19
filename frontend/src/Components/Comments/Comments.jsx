import React, { useState } from 'react'
import Actions from '../Actions/Action';
import { SlOptions } from "react-icons/sl";


const Comments = ({comment,likes,createdAt,username,userAvatar}) => {
    const [liked, setLiked] = useState(false);

    return (
        <div className='comment-section'>
            <div className="right-part-1" style={{padding:"1rem"}}>
                <div className="post-header-1">
                    <div>
                        <div>
                            <img src={userAvatar} alt=""  style={{borderRadius:"50%"}}/>
                        </div>
                        <div className='ok-1'>{username}</div>
                    </div>
                    <div>
                        <span>{createdAt}</span>
                        <span><SlOptions style={{ cursor: "pointer" }} /></span>
                    </div>
                </div>
                <p className="post-heading" style={{paddingLeft:"40px",margin:"0"}}>{comment}</p>
               <div style={{paddingLeft:"40px"}}>
               <Actions liked={liked} setLiked={setLiked} />
               </div>
                <div className="bottom-part" style={{paddingLeft:"40px",margin:"0"}}>
                    <div className='follower-info'>
                        <div style={{ color: "#4d4d4d" }}>{likes + (liked ? 1 : 0)} likes</div>
                    </div>
                </div>
            </div>
            <div className="divider"></div>
        </div>
    )
}

export default Comments
