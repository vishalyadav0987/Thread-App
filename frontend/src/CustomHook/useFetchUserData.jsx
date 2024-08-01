import axios from 'axios';
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

const useFetchUserData = () => {
    const [userDataloading, setLoading2] = useState(false);
    const [user, setUser] = useState(null);
    const { username } = useParams();

    useEffect(() => {
        const fetchUserData = async () => {
            setLoading2(true);
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
                if(response.data.data.isFreezAccount){
                    setUser(null);
                    return;
                }
                setUser(response.data.data);
            } catch (error) {
                console.log("Error in fetchUserData Function ->", error.message);
            }
            finally {
                setLoading2(false);
            }
        }
        fetchUserData()
    }, [username])
    return { user, userDataloading }
}

export default useFetchUserData
