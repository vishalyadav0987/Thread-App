import React, { useEffect, useState } from 'react'
import UserHeader from '../../Components/UserHeader/UserHeader'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import toast from 'react-hot-toast'
import { Spinner } from '@chakra-ui/react'
import Post from '../../Components/Post/Post'
import { usePostContext } from '../../Context/PostContext'

const UserPage = () => {
  const [user, setUser] = useState(null);
  const { username } = useParams();
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const { posts, setPosts } = usePostContext()

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/user/profile/${username}`,
          { withCredentials: true }
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
      finally {
        setLoading(false);
      }
    }

    const fetchUserAllPosts = async () => {
      setLoading2(true);
      try {
        const response = await axios.get(
          `http://localhost:3000/api/v1/post/user/posts/${username}`,
          { withCredentials: true }
        )
        if (response.data.success) {
          // console.log(response.data.data)
          setPosts(response.data.data)
        }
        else {
          toast.error(response.data.message, {
            className: 'custom-toast', // Custom class for styling)
          });
        }
      } catch (error) {
        console.log("Error in fetchUserAllPosts Function ->", error.message);
        setPosts([])
      }
      finally {
        setLoading2(false);
      }
    }
    fetchUserData();
    fetchUserAllPosts();
  }, [username, setPosts]);
  // console.log(posts)
  if (!user && !loading) {
    return (
      <div style={{
        textAlign: "center",
        marginTop: "40px",
        fontFamily: "sans-serif",
        fontSize: "18px"
      }}>
        User not found
      </div>
    )
  }

  if (!user && loading) {
    return (
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "35vh"
      }}>
        <Spinner size='lg' />
      </div>
    )
  }

  if (!user) return null;
  return (
    <>
      <div className="userpage-section">
        <UserHeader user={user} />
      </div>
      {
        !loading2 && (
          posts && posts?.length === 0 && <h1
            style={{
              textAlign: "center",
              marginTop: "30px",
              fontSize: "20px",
              fontFamily: "sans-serif"
            }}
          >User not have any Post.</h1>
        )
      }

      {
        loading2 && (
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: "5vh"
          }}>
            <Spinner size='lg' />
          </div>
        )
      }

      {
        !loading2 && (
          posts.length > 0 && posts.map((post) => {
            return (
              <Post post={post} key={post._id} />
            )
          })
        )
      }
    </>
  )
}

export default UserPage
