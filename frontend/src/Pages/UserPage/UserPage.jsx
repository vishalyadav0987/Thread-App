import React from 'react'
import UserHeader from '../../Components/UserHeader/UserHeader'
import UserPost from '../../Components/UserPost/UserPost'

const UserPage = () => {
  return (
    <>
      <div className="userpage-section">
        <UserHeader />
        <UserPost
          postImg={"/post1.png"}
          likes={100}
          replies={481}
          postTitle={"This is my first image."}
        />
        <UserPost 
        postImg={"/logo192.png"}
        likes={170}
        replies={451}
        postTitle={"This is my second image."}/>
        <UserPost 
        postImg={"/light-logo.svg"}
        likes={600}
        replies={301}
        postTitle={"This is my Third image."}/>
        <UserPost 
        postImg={"/logo512.png"}
        likes={20000}
        replies={41}
        postTitle={"This is my fourth image."}/>
      </div>
    </>
  )
}

export default UserPage
