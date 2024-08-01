import React from 'react'
import { Button } from '@chakra-ui/react'
import LogoutIcon from '@mui/icons-material/Logout';
import useLogoutHook from '../../CustomHook/useLogoutHook';

const Logout = () => {
    const { handleOnLogout, loading } = useLogoutHook()
    return (
        <>
            <div className="button" style={{
                position: "absolute",
                top: "12px",
                right: "12px"

            }}>
                <Button
                    isLoading={loading}
                    onClick={handleOnLogout} >
                    <LogoutIcon />
                </Button>
            </div >
        </>
    )
}

export default Logout
