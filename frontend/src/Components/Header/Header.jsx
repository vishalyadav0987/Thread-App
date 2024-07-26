import React from 'react'
import { useColorMode } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import { useAuthContext } from '../../Context/AuthContext';



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
                {
                    authUser && (
                        <Link to={'/update'}>
                            <FaRegUserCircle size={"36px"} />
                        </Link>
                    )
                }
            </div>
        </>
    )
}

export default Header
