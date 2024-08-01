import React from 'react'
import { Button } from '@chakra-ui/react'
import LogoutIcon from '@mui/icons-material/Logout';
import useLogoutHook from '../../CustomHook/useLogoutHook';
import { useLocation } from 'react-router-dom';

const Logout = () => {
    const location = useLocation();
    const { handleOnLogout, loading } = useLogoutHook()
    return (
        <>
            {
                location.pathname === '/setting' && (
                    <div className="button-logout" style={{
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
                )
            }
        </>
    )
}

export default Logout
