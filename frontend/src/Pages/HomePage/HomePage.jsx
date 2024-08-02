import React, { useEffect, useState } from 'react';
import { Button, Spinner, useColorMode } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../Context/AuthContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import Post from '../../Components/Post/Post';
import { usePostContext } from '../../Context/PostContext';

const HomePage = () => {
    const { colorMode } = useColorMode();
    const { authUser } = useAuthContext();
    const { posts, setPosts } = usePostContext();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleToJumpProfile = () => {
        navigate(`/${authUser?.username}`);
    };
    useEffect(() => {
        // Fetch the feed posts of users whom the user has followed
        const getFeedOfUser = async () => {
            setLoading(true);
            setPosts([]);
            try {
                const response = await axios.get(
                    'https://thread-app-mc1i.onrender.com/api/v1/post/feed',
                    { withCredentials: true }
                );
                if (response.data.success) {
                    setPosts(response.data.data);
                } else {
                    toast.error(response.data.message, {
                        className: 'custom-toast',
                    });
                }
            } catch (error) {
                console.error('Error in getFeedOfUser->', error.message);
            } finally {
                setLoading(false);
            }
        };


        getFeedOfUser();
    }, [setPosts]);

    return (
        <>
            <div
                className="button"
                style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginTop: '24px',
                    marginBottom: '30px',
                }}
            >
                <Button
                    onClick={handleToJumpProfile}
                    style={{
                        border: `${colorMode !== 'dark' ? '1px solid #232323' : 'none'}`,
                    }}
                >
                    Visit Profile Page
                </Button>
            </div>
            {!loading && posts.length === 0 && (
                <h1
                    style={{
                        textAlign: 'center',
                        marginTop: '40px',
                        fontFamily: 'sans-serif',
                        fontSize: '18px',
                    }}
                >
                    Follow some users to see their posts.
                </h1>
            )}
            {loading && (
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        marginTop: '35vh',
                    }}
                >
                    <Spinner size="lg" />
                </div>
            )}
            {!loading &&
                posts.length > 0 &&
                posts.map((post) => <Post key={post._id} post={post} />)}
        </>
    );
};

export default HomePage;
