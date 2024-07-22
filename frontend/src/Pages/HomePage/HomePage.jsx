import React from 'react'
import { Button } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
    const navigate = useNavigate();
    const handleToJumpProfile = () => {
        navigate(`/vishal`)
    }
    return (
        <>
            <div className="button" style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "24px"
            }}>
                <Button onClick={handleToJumpProfile}>
                    Visit Profile Page
                </Button>
            </div>
        </>
    )
}

export default HomePage