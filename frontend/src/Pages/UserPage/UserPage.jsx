import React, { useEffect, useState } from 'react'
import UserHeader from '../../Components/UserHeader/UserHeader'
import UserPost from '../../Components/UserPost/UserPost'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams()

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/user/profile/${username}`
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
    }
    fetchUserData();
  }, [username]);

  if (!user) return null;
  return (
    <>
      <div className="userpage-section">
        <UserHeader user={user} />
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
          postTitle={"This is my second image."} />
        <UserPost
          postImg={"/light-logo.svg"}
          likes={600}
          replies={301}
          postTitle={"This is my Third image."} />
        <UserPost
          postImg={"/logo512.png"}
          likes={20000}
          replies={41}
          postTitle={"This is my fourth image."} />
      </div>
    </>
  )
}

export default UserPage
