import React from 'react'
import { useColorMode } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { FaUserCircle } from "react-icons/fa";
import { useAuthContext } from '../../Context/AuthContext';
import { AiFillMessage } from "react-icons/ai";



const imageStyle = {
    width: "40px",
    cursor: "pointer"
}



const Header = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const { authUser } = useAuthContext();

    const headerStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent: `${authUser ? "space-between" : "center"}`,
        padding: "0.8rem"
    };
    return (
        <>
            <div className="header" style={headerStyle}>
                {
                    authUser && (
                        <Link to={'/'}>
                            <FaHome size={"36px"} />
                        </Link>
                    )
                }
                <img
                    style={imageStyle}
                    src={colorMode === "dark" ? "/light-logo.svg" : "/dark-logo.svg"}
                    alt="Logo"
                    onClick={toggleColorMode}
                />
                <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px"
                }}>
                    {
                        authUser && (
                            <Link to={'/chat'}>
                                <AiFillMessage size={"36px"} />
                            </Link>
                        )
                    }
                    {
                        authUser && (
                            <Link to={'/update'}>
                                <FaUserCircle size={"34px"} />
                            </Link>
                        )
                    }
                </div>
            </div>
        </>
    )
}

export default Header
