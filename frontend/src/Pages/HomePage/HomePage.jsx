import React, { useEffect, useState } from 'react'
import { Button, Spinner } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import Post from '../../Components/Post/Post';


const HomePage = () => {
    const { authUser } = useAuthContext();
    const [feedPost, setFeedPost] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleToJumpProfile = () => {
        navigate(`/${authUser?.username}`)
    }
    // The posts of users whom the user has followed will be shown
    const getFeedOfUser = async () => {
        setLoading(true);
        try {
            const response = await axios.get(
                'http://localhost:3000/api/v1/post/feed',
                { withCredentials: true }
            );
            if (response.data.success) {
                setFeedPost(response.data.data);
                // console.log(response.data.data);
            } else {
                toast.error(response.data.message, {
                    className: 'custom-toast', // Custom class for styling)
                })
            }
        } catch (error) {
            console.log("Error in getFeedOfUser->", error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getFeedOfUser();
    }, [])
    return (
        <>
            <div className="button" style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "24px",
                marginBottom:"30px"
            }}>
                <Button onClick={handleToJumpProfile}>
                    Visit Profile Page
                </Button>
            </div>
            {
                !loading && feedPost.length === 0 && <h1 style={{
                    textAlign: "center",
                    marginTop: "40px",
                    fontFamily: "sans-serif",
                    fontSize: "18px"
                }}>Follow some user to see their post.</h1>
            }
            {
                loading && (
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

            {
                !loading && (
                    feedPost.length > 0 && feedPost.map((post) => {
                        return (
                            <Post key={post._id} post={post} />
                        )
                    })
                )
            }
        </>
    )
}

export default HomePage
