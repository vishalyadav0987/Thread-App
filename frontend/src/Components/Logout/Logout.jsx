import { Button } from '@chakra-ui/react'
import React from 'react'
import { useAuthContext } from '../../Context/AuthContext'
import axios from 'axios';
import toast from 'react-hot-toast';
import LogoutIcon from '@mui/icons-material/Logout';

const Logout = () => {
    const { setAuthUser } = useAuthContext();
    const handleOnLogout = async () => {
        try {
            const response = await axios.get('http://localhost:3000/api/v1/user/logout');
            if (response.data.success) {
                toast.success(response.data.message, {
                    className: 'custom-toast', // Custom class for styling)
                });
                localStorage.removeItem("user-threads");
                setAuthUser(null)
            }
            else {
                toast.error(response.data.message, {
                    className: 'custom-toast', // Custom class for styling)
                })
            }

        } catch (error) {
            console.log("Error in handleOnLogout->", error);
            toast.error(error.message, {
                className: 'custom-toast', // Custom class for styling)
            })
        }
    }
    return (
        <>
            <div className="button" style={{
                position: "absolute",
                top: "12px",
                right: "12px"

            }}>
                <Button onClick={handleOnLogout}>
                    <LogoutIcon />
                </Button>
            </div >
        </>
    )
}

export default Logout
